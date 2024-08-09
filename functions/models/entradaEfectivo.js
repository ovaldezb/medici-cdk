import mongoose from "mongoose";
var { Schema } = mongoose;

const EntradaEfectivoSchema = new Schema({
  id: String,
  cantidad:Number,
  comentario: String,
  sucursal:String,
  fechaEntrada:Date
});

module.exports = mongoose.model('EntradaEfectivo',EntradaEfectivoSchema);