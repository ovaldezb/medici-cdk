import mongoose from "mongoose";
var { Schema } = mongoose;

var PerfilSchema = new Schema({
  id: String,
  nombre: String,
  valor: String
});

module.exports = mongoose.model('Perfil', PerfilSchema);