import mongoose from "mongoose";
var { Schema } = mongoose;

var PreguntasSchema = new Schema({
  id: String,
  seccion: String,
  noPregunta: String,
  pregunta: String,
  boleana: Boolean
});

module.exports = mongoose.model('Pregunta',PreguntasSchema)