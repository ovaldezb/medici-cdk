import mongoose from "mongoose";
var { Schema } = mongoose;

var PreguntaAntFamSchema = new Schema({
  id: String,
  respuestas: [{respuesta:string, valor:string}],
  pregunta: String,
  otro: String,
  opcional:Boolean
});

module.exports = mongoose.model('PreguntaAntFam',PreguntaAntFamSchema);