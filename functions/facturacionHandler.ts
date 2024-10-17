import fetch from 'node-fetch';
import { Factura } from './models/factura';
import { Concepto } from './models/concepto';
import { Traslados } from './models/traslados';
import { Impuestos } from './models/impuestos';
import { Retenciones } from './models/retenciones';
import { ImpuestosConcepto } from './models/impuestosConcepto';
import { Emisor } from './models/emisor';
import { Receptor } from './models/receptor';
const database = require('./service/facturaEmitidaDB');
const db = database(process.env.MONGODB_URI);
const fh = require('./service/facturaHtml');
const facturaHtml = fh();

const headersSW ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : 'true',
  'Content-Type': 'application/json',
  'user':process.env.USER_SWSAP!,
  'password': process.env.PASSWORD_SWSAP!
};

const headers = {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
}

export const handler = async function (event:any) {
  const method = event.requestContext.httpMethod;
  const action = event.pathParameters.rfc;
  switch(method){
    case 'GET':    
      if(action==='rfc'){
        let rfc = event.queryStringParameters.rfc;
        return obtieneDatosByRFC(rfc);
      }else if(action==='idticket'){
        let ticketId = event.queryStringParameters.ticketId;
        let sucursal = event.queryStringParameters.sucursal;
        let fecha = event.queryStringParameters.fecha;
        let total = event.queryStringParameters.total;
        const filtro = {noTicket:ticketId,sucursal:sucursal, total:Number(total),fechaVenta:{'$gte':`${fecha}T00:00:00.000Z`,'$lte':`${fecha}T23:59:59.999Z`}}
        return obtieneVentaById(filtro);
      }else if(action==='idventa'){
        let idVenta = event.queryStringParameters.ventaId;
        const filtro = {_id:idVenta}
        return obtieneVentaById(filtro);
      }else if(action==='usocfdi'){
        return obtieneUsoCfdis();
      }else if(action==='regimenfiscal'){
        return ontieneRegimenFiscal();
      }else if(action==='formapago'){
        return obtieneFormaPago();
      }else if(action==='email'){
        return sendEmail('test001.pdf','cfdi.xml','omar.valdez.becerril@gmail.com','<xml></xml>');
      }
    case 'POST':
      return emisionFactura(event);
    case 'PUT':
      return saveDatosFactura(event);
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function sendEmail( pdfFileName:string, xmlFileName:string, to:string, xml:string) {
  const htmlBody:string = '';
  const datosCorreo ={
    'to':to,
    'from':'omar_cio@hotmail.com',
    'pdfFileName':pdfFileName,
    'html':htmlBody,
    'subject':'Factura de Clinicas B&B',
    'body':'',
    'xml':xml,
    'xmlFileName':xmlFileName
  }
  
  try{
    const responsepdf = await fetch(process.env.PDF_SERVICE_URL+"/api/pdf", {
      method: "POST",
      body: JSON.stringify(datosCorreo),
      headers: {'Content-Type': 'application/json'}
    });
    const resp:any = await responsepdf.text();
    if (!responsepdf.ok){
      return{
        statusCode:200,
        body:JSON.stringify({'mensaje':'error'}),
        headers:headers
      }
    }else{
      return{
        statusCode:200,
        body:JSON.stringify({mensaje:resp}),
        headers:headers
      }
    }
  }catch(error:any){
    console.log('Error catch',error);
    return{
      statusCode:200,
      body:JSON.stringify({'mensaje':error}),
      headers:headers
    }
  }
  
  
}

async function obtieneDatosByRFC(rfc:string) {
  const datosFactura = await db.getDatosFacturaByRfc(rfc);
  if(datosFactura===null || datosFactura.error!=null){
    return{
      statusCode:500,
      body:JSON.stringify({'mensaje':'no se encontraron los datos de este RFC:'+rfc}),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(datosFactura),
    headers:headers
  }
}

async function obtieneVentaById(filtro:any) {
  const venta = await db.getVentaById(filtro);
  if(venta===null || venta.error!=null){
    return{
      statusCode:404,
      body:JSON.stringify({mensaje:'error al obtener la venta'+venta.error}),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(venta),
    headers:headers
  }
}

async function obtieneUsoCfdis(){
  const listaUsoCfdis = await db.getUsoCfdi();
  if(listaUsoCfdis===null || listaUsoCfdis.error){
    return{
      statusCode:500,
      body:JSON.stringify({'mensaje':'error al obtener la lista de uso de CFDI '+listaUsoCfdis.error}),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(listaUsoCfdis),
    headers:headers
  }
}

async function ontieneRegimenFiscal() {
  const listaRegiemFiscal = await db.getRegimenFiscal();
  if(listaRegiemFiscal===null || listaRegiemFiscal.error!=null){
    return{
      statusCode:500,
      body:JSON.stringify({'mensaje':'error al obtener la lista de regimen fiscal '+listaRegiemFiscal.error}),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(listaRegiemFiscal),
    headers:headers
  }
}

async function obtieneFormaPago(){
  const listaFormaPago = await db.getListaFormaPago();
  if(listaFormaPago===null || listaFormaPago.error!=null){
    return{
      statusCode:500,
      body:JSON.stringify({'mensaje':'error al obtener la lista de formas de pago '+listaFormaPago.error}),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(listaFormaPago),
    headers:headers
  }
}

async function saveDatosFactura(event:any) {
  let body = JSON.parse(event.body);
  const datosFactura = await db.saveDatosFactura(body);
  if(datosFactura===null || datosFactura.error!=null){
    return{
      statusCode:500,
      body:JSON.stringify({'mensaje':'error al guardar los datos de la factura'}),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(datosFactura),
    headers:headers
  }
}

async function emisionFactura(event:any) {
  let factura:Factura={} as Factura;
  let url = process.env.URL_FACTURACION+'/security/authenticate';
  let tokenResponse = await fetch(url, {
    method: 'POST',
    headers: headersSW
  });
  let token =  await tokenResponse.json()
                .then((tok:any)=>{
                  return tok.data.token;
                });
  const body = JSON.parse(event.body);
  factura.Version = body.Version;
  factura.FormaPago = body.FormaPago;
  factura.Serie = body.Serie;
  factura.Folio = body.Folio
  factura.Fecha = body.Fecha;
  factura.MetodoPago = body.MetodoPago;
  factura.Sello = body.Sello;
  factura.NoCertificado = body.NoCertificado;
  factura.Certificado = body.Certificado;
  factura.CondicionesDePago = body.CondicionesDePago;
  factura.SubTotal = body.SubTotal;
  factura.Descuento = body.Descuento;
  factura.Moneda = body.Moneda;
  factura.TipoCambio = body.TipoCambio;
  factura.Total = body.Total;
  factura.TipoDeComprobante = body.TipoDeComprobante;
  factura.Exportacion = body.Exportacion;
  factura.LugarExpedicion = body.LugarExpedicion;
  factura.Emisor = new Emisor(body.Emisor.Rfc,body.Emisor.Nombre,body.Emisor.RegimenFiscal);
  factura.Receptor = new Receptor(body.Receptor.Rfc,body.Receptor.Nombre,body.Receptor.DomicilioFiscalReceptor,body.Receptor.RegimenFiscalReceptor,body.Receptor.UsoCFDI);
  factura.Conceptos = [];
  body.Conceptos.forEach((con:any)=>{
    let concepto:Concepto = new Concepto('','','','','','','','','','',new ImpuestosConcepto([],[]));
    concepto.ClaveProdServ = con.ClaveProdServ;
    concepto.NoIdentificacion = con.NoIdentificacion;
    concepto.Cantidad = con.Cantidad;
    concepto.ClaveUnidad = con.ClaveUnidad;
    concepto.Unidad = con.Unidad;
    concepto.Descripcion = con.Descripcion;
    concepto.ValorUnitario = con.ValorUnitario;
    concepto.Importe = con.Importe;
    concepto.Descuento = con.Descuento;
    concepto.ObjetoImp = con.ObjetoImp;
    
    con.Impuestos.Traslados.forEach((tras:any)=>{
      let traslado:Traslados=new Traslados('','','','','');
      traslado.Base = tras.Base;
      traslado.Importe = tras.Importe;
      traslado.Impuesto = tras.Impuesto;
      traslado.TasaOCuota = tras.TasaOCuota;
      traslado.TipoFactor = tras.TipoFactor;
      concepto.Impuestos.Traslados.push(traslado);
    });
    con.Impuestos.Retenciones.forEach((reten:any)=>{
      let retencion:Retenciones=new Retenciones('','','','','');
      retencion.Base = reten.Base;
      retencion.Importe = reten.Importe;
      retencion.Impuesto = reten.Impuesto;
      retencion.TasaOCuota = reten.TasaOCuota;
      retencion.TipoFactor = reten.TipoFactor;
      concepto.Impuestos.Retenciones.push(retencion);
    });
    factura.Conceptos.push(concepto);
  });
  
  let impuestos:Impuestos = new Impuestos('','',[],[]);
  impuestos.TotalImpuestosRetenidos = body.Impuestos.TotalImpuestosRetenidos;
  impuestos.TotalImpuestosTrasladados = body.Impuestos.TotalImpuestosTrasladados;
  body.Impuestos.Traslados.forEach((tras:any)=>{
    let traslado:Traslados = new Traslados('','','','','');
    traslado.Base = tras.Base;
    traslado.Importe = tras.Importe;
    traslado.Impuesto = tras.Impuesto;
    traslado.TasaOCuota = tras.TasaOCuota;
    traslado.TipoFactor = tras.TipoFactor;
    impuestos.Traslados.push(traslado);
  });

  body.Impuestos.Retenciones.forEach((reten:any)=>{
    let retenciones:Retenciones = new Retenciones('','','','','');
    retenciones.Base = reten.Base;
    retenciones.Importe = reten.Importe;
    retenciones.Impuesto = reten.Impuesto;
    retenciones.TasaOCuota = reten.TasaOCuota;
    retenciones.TipoFactor = reten.TipoFactor;
    impuestos.Retenciones.push(retenciones);
  });
  factura.Impuestos = impuestos;
  
  
  let response = await fetch(process.env.URL_FACTURACION+'/v3/cfdi33/issue/json/v4',{
    method:'POST',
    headers:{
      'Authorization':'Bearer '+token,
      'Content-Type':'application/jsontoxml'
    },
    body:JSON.stringify(factura)
  });

  const responseEmision:any = await response.json();
  if(responseEmision.data===null || responseEmision.data===undefined){
    return{
      statusCode:500,
      body:JSON.stringify(responseEmision),
      headers:headers
    }
  }
  console.log('Se timbró la factura');
  const facturaResponse = await db.save(responseEmision,factura.Receptor.Rfc,factura.Receptor.Nombre);
  if(facturaResponse===null || facturaResponse.error!= null){
    return{
      statusCode:500,
      body:JSON.stringify({'mensaje':'error al guardar la factura'}),
      headers:headers
    }
  }
  //console.log('Se guardó la Fact en la BD:'+facturaResponse);
  //enviar correo con pdf y xml
  const htmlBody = await facturaHtml.generaHtml(responseEmision.data,body);
  const datosCorreo ={
    'to':body.Receptor.email,
    'from':'omar_cio@hotmail.com',
    'pdfFileName':responseEmision.data.uuid+'.pdf',
    'html':htmlBody,
    'subject':'Factura de Clinicas B&B',
    'body':'<h2>Adjunto encontrará su factura electrónica</h2>',
    'xml':responseEmision.data.cfdi,
    'xmlFileName':'cfdi.xml'
  }
  const responsepdf = await fetch(process.env.PDF_SERVICE_URL+"/api/pdf", {
    method: "POST",
    body: JSON.stringify(datosCorreo),
    headers: {'Content-Type': 'application/json'}
  });
  //console.log('Envio de correo con pdf '+responsepdf);

  const resultUpdt = await db.updateVentaFacturada(event.pathParameters.rfc, responseEmision.data.fechaTimbrado);
  return {
    statusCode:200,
    body:JSON.stringify(
      {
      'uuid':facturaResponse.facturaEmitida.uuid,
      'fechaTimbrado':facturaResponse.facturaEmitida.fechaTimbrado,
      'rfc':facturaResponse.facturaEmitida.rfc,
      'message':resultUpdt
      }
    ),
    headers:headers
  }
}

/*async function getToken() {
  let response = await fetch('https://services.test.sw.com.mx/security/authenticate', {
    method: 'POST',
    headers: headers
  });
  let resp = await response.json();
  return {
    statusCode:200,
    body:JSON.stringify(resp)
  };
} */