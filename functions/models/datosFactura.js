'use strict'
import mongoose from "mongoose";
var { Schema } = mongoose;

const DatosFacturaSchema = new Schema(
  {
    id:String,
    Rfc: String,
    Nombre: String,
    DomicilioFiscalReceptor: String,
    RegimenFiscalReceptor: String,
    UsoCFDI: String
  }
);

module.exports = mongoose.model('DatosFactura',DatosFacturaSchema)