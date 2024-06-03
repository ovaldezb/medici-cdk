import mongoose from "mongoose";
const PreguntaAntFam = require('../models/preguntaAntFam');
const RespuestaAntFam = require('../models/respuestaAntFam');

const preguntaAntFamDB = (mongoUri:string) =>{
  mongoose.connect(mongoUri,{});

  return {
    loadAllQuestions:()=>{
      return PreguntaAntFam.find()
      .then((listPreguntas:any)=>{
        return { preguntas:listPreguntas}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    },
    saveRespuesta:(respuesta:any)=>{
      return new RespuestaAntFam({
        fechaRespuesta:respuesta.fechaRespuesta,
        paciente: respuesta.paciente,
        respuestas: respuesta.respuesta
      })
      .save()
      .then((respuestaSaved:any)=>{
        return {respuesta:respuestaSaved};
      })
      .catch((err:any)=>{
        return {errror:err};
      })
    }
  }
}

module.exports = preguntaAntFamDB;