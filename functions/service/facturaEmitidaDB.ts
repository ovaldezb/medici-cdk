import mongoose from "mongoose";
const FacturaEmitida = require('../models/facturaEmitida')

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
    }
  }
}

module.exports = facturaEmitidaDB;