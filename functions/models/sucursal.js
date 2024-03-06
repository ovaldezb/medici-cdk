import mongoose from "mongoose";
var { Schema } = mongoose;

const SucursalSchema = new Schema({
  id:String,
  identificador:String,
  direccion: String,
  codigoPostal: String,
  nombreAdmin: String,
  telefono:String,
  isEnabled: Boolean
});

module.exports = mongoose.model('Sucursal',SucursalSchema);