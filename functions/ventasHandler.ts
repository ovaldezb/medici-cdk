const database = require('./service/ventaDB');
const db = database(process.env.MONGODB_URI);

const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async (event:any) => {
  const method = event.requestContext.httpMethod;
  const action = event.pathParameters.action;
  
  let fecha = '';
  let sucursal = '';
  switch(method){
    case 'GET':
      if(action==='ticket'){
        return getTicketConsecutivo();
      }else if(action==='entrada'){
        fecha = event.queryStringParameters.fecha;
        sucursal = event.queryStringParameters.sucursal;
        return getEntradasByDate(fecha,sucursal);
      }else if(action==='salida'){
        fecha = event.queryStringParameters.fecha;
        sucursal = event.queryStringParameters.sucursal;
        return getSalidasByDate(fecha,sucursal);
      }
    case 'POST':
      if(action==='add'){
        return addVenta(event);
      }else if(action==='entrada'){
        return addEntrada(event);
      }else if(action==='salida'){
        return addSalida(event);
      }
      
    default:
      throw new Error("Unsupported route "+method);
  }
}

async function getTicketConsecutivo() {
  const ticketVenta = await db.getTicket();
  if(ticketVenta===null || ticketVenta.error!=null){
    return {
      statusCode:404,
      body:JSON.stringify(ticketVenta),
      headers:headers
    } 
  }

  return {
    statusCode:200,
    body:JSON.stringify(ticketVenta),
    headers:headers
  }
}

async function addVenta(event:any) {
  let bodyVenta = JSON.parse(event.body);
  const venta = await db.saveVenta(bodyVenta);
  if(venta===null || venta.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(venta),
      headers:headers
    } 
  }
  
  bodyVenta.ventaProducto.forEach((prod:any) => {
    db.updateExistencia(prod);
  });
  return {
    statusCode:200,
    body:JSON.stringify(venta),
    headers:headers
  }
}

async function addEntrada(event:any) {
  let bodyEntrada = JSON.parse(event.body);
  const entradaEfectivo = await db.saveEntrada(bodyEntrada);
  if(entradaEfectivo===null || entradaEfectivo.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(entradaEfectivo),
      headers:headers 
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(entradaEfectivo),
    headers:headers
  }
}

async function addSalida(event:any) {
  let bodySalida = JSON.parse(event.body);
  const salidaEfectivo = await db.saveSalida(bodySalida);
  if(salidaEfectivo=== null || salidaEfectivo.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(salidaEfectivo),
      headers:headers 
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(salidaEfectivo),
    headers:headers
  }
}

async function getEntradasByDate(fecha:string, sucursal:string) {
  const listaEntradas = await db.getListaEntradasByDate(fecha,sucursal);
  if(listaEntradas===null || listaEntradas.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(listaEntradas),
      headers:headers 
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(listaEntradas),
    headers:headers
  }
}

async function getSalidasByDate(fecha:string, sucursal:string) {
  const listaSalidas = await db.getListaSalidasByDate(fecha,sucursal);
  if(listaSalidas===null || listaSalidas.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(listaSalidas),
      headers:headers 
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(listaSalidas),
    headers:headers
  }
}
