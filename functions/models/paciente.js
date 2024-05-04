import mongoose from 'mongoose';
var { Schema } = mongoose;

var PacienteScheme = new Schema({
  id:String,
  nombre: String,
  apellidoP: String,
  apellidoM: String,
  fechaNacimiento: Date,
  telefono: String,
  correo:String,
  sexo: String,
  carnet: String,
  codigoPostal: String,
  ocupacion: String,
  raza: String
});

module.exports  = mongoose.model('Paciente',PacienteScheme);