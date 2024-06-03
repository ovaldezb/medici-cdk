import mongoose from "mongoose";
import Paciente from '../models/paciente';
import PreguntaAntFam from '../models/preguntaAntFam';
var { Schema } = mongoose;


var RespuestaAntFamSchema = new Schema({
  id: String,
  fechaRespuesta: Date,
  paciente: Paciente,
  respuestas: [{pregunta: PreguntaAntFam, valor:string}]
});

module.exports = mongoose.model('RespuestaAntFam',RespuestaAntFamSchema);