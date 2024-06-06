import mongoose from "mongoose";
import Paciente from '../models/paciente';
import PreguntaAntFam from '../models/preguntaAntFam';
var { Schema } = mongoose;


var RespuestaAntFamSchema = new Schema({
  id: String,
  fechaRespuesta: Date,
  paciente: {
    type: Schema.Types.ObjectId,
    ref: "Paciente",
    required:[true,"{VALUE} no puede ser null"]
  },
  respuestas: [
    {
      pregunta: {
        type: Schema.Types.ObjectId,
        ref: "PreguntaAntFam",
        required:[true,"{VALUE} no puede ser null"]
      }, 
      valor:String
    }]
});

module.exports = mongoose.model('RespuestaAntFam',RespuestaAntFamSchema);