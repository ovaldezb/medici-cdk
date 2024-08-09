import mongoose from "mongoose";
var { Schema } = mongoose;

const SalidaEfectivoSchema = new Schema({
  id: String,
  cantidad:Number,
  comentario: String,
  sucursal:String,
  fechaSalida:Date
});

module.exports = mongoose.model('SalidaEfectivo',SalidaEfectivoSchema);