'use strict'

import mongoose from "mongoose";
var { Schema } = mongoose;

var FacturaEmitidaSchema = Schema({
  cadenaOriginalSAT: String,
  noCertificadoSAT: String,
  noCertificadoCFDI: String,
  uuid: String,
  selloSAT: String,
  selloCFDI: String,
  fechaTimbrado: Date,
  qrCode: String,
  cfdi: String,
  status:String,
  rfc:String,
  nombre:String
});

module.exports = mongoose.model('FacturaEmitida',FacturaEmitidaSchema);