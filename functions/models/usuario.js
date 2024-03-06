import mongoose from 'mongoose';
var { Schema } = mongoose;

var UsuarioSchema = new Schema({
  id:String,
  nombre: String,
  apellidoP: String,
  apellidoM: String,
  email: String,
  telefono: String,
  dob: String,
  sexo: String,
  perfil: String,
  cedula: String,
  isAdmin:Boolean,
  rfc: String,
  /*creationDate:{
    type: Date,
    default: new Date()
  },*/
  especialidad:String,
  isDisabled:Boolean,
  sucursal: String
});

module.exports = mongoose.model('Usuario',UsuarioSchema);