import mongoose from "mongoose";
var { Schema } = mongoose;

var PreguntaAntFamSchema = new Schema({
  id: String,
  respuestas: [{respuesta:String, valor:String}],
  pregunta: String,
  opcional:Boolean,
  orden:Number
});

module.exports = mongoose.model('PreguntaAntFam',PreguntaAntFamSchema);