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
  especialidad:String,
  isDisabled:Boolean,
  sucursal: {
    type: Schema.Types.ObjectId,
    ref: "Sucursal"
  } 
});

module.exports = mongoose.model('Usuario',UsuarioSchema);