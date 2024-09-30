import mongoose from "mongoose";
const FacturaEmitida = require('../models/facturaEmitida')
const DatosFactura = require('../models/datosFactura');
const Venta = require('../models/venta');
const UsoCfdi = require('../models/usoCfdi');
const RegimenFiscal = require('../models/regimenfiscal');
const FormaPago = require('../models/formapago');

require('../models/producto');
const facturaEmitidaDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return{
    save:(params:any,rfc:string, nombre:string)=>{
      return new FacturaEmitida({
        cadenaOriginalSAT : params.data.cadenaOriginalSAT,
        noCertificadoSAT  : params.data.noCertificadoSAT,
        noCertificadoCFDI : params.data.noCertificadoCFDI,
        uuid              : params.data.uuid,
        selloSAT          : params.data.selloSAT,
        selloCFDI         : params.data.selloCFDI,
        fechaTimbrado     : params.data.fechaTimbrado,
        qrCode            : params.data.qrCode,
        cfdi              : params.data.cfdi,
        status            : params.status,
        rfc               : rfc,
        nombre            : nombre
      })
      .save()
      .then((facturaSaved:any)=>{
        return { facturaEmitida:facturaSaved}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    },
    saveDatosFactura:(params:any)=>{
      return new DatosFactura(
        {
          Rfc                    : params.Rfc,
          Nombre                 : params.Nombre,
          DomicilioFiscalReceptor: params.DomicilioFiscalReceptor,
          RegimenFiscalReceptor  : params.RegimenFiscalReceptor,
          UsoCFDI                : params.UsoCFDI
        }
      )
      .save()
      .then((datosSaved:any)=>{
        return{datosFactura:datosSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return{
          error:err
        };
      })
    },
    getDatosFacturaByRfc:(rfc:string)=>{
      return DatosFactura.findOne({'Rfc':rfc})
      .then((datosFound:any)=>{
        return {datosFactura:datosFound};
      })
      .catch((err:any)=>{
        console.log(err);
        return{
          error:err
        };
      })
    },
    getVentaById:(filtro:any)=>{
      return Venta.findOne(filtro)
      .populate( //también se puede usar "ventaProducto.producto"
        {
          path:"ventaProducto", 
          populate:
            {
              path:"producto"
            } 
          }
      )
      .then((ventaFound:any)=>{
        return {venta:ventaFound}
      })
      .catch((err:any)=>{
        console.log(err);
        return {
          error:err
        }
      })
    },
    getUsoCfdi:()=>{
      return UsoCfdi.find()
      .then((listaUsoCfdi:any)=>{
        return {listaUsoCfdi:listaUsoCfdi}
      })
      .catch((err:any)=>{
        console.log(err);
        return{error:err}
      })
    },
    getRegimenFiscal:()=>{
      return RegimenFiscal.find()
      .then((listaRegiemFiscal:any)=>{
        return {
          listaRegimenFiscal:listaRegiemFiscal
        }
      })
      .catch((err:any)=>{
        console.log(err);
        return{
          error:err
        }
      })
    },
    getListaFormaPago:()=>{
      return FormaPago.find()
      .then((listaFormaPago:any)=>{
        return {
          listaFormaPago:listaFormaPago
        }
      })
      .catch((err:any)=>{
        console.log(err);
        return{error:err}
      });
    },
    updateVentaFacturada:(idVenta:String,fechaFacturado:Date)=>{
      Venta.updateOne({_id:idVenta},{isFacturado:true,fechaFacturado:fechaFacturado})
      .then((ventaFound:any)=>{
        console.log(ventaFound);
        return ventaFound;
      })
      .catch((err:any)=>{
        console.log(err);
      });
    },
  }
}

module.exports = facturaEmitidaDB;