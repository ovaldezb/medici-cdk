import mongoose from "mongoose";
const Pregunta = require('../models/preguntas');

const preguntaDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return {
    loadQuestions:(seccion:any)=>{
      return Pregunta.find({
        seccion:seccion
      })
      .then((listaPreguntas:any)=>{
        return {preguntas:listaPreguntas}
      })
      .catch((err:any)=>{
        console.log('Error en cargar preguntas',err);
        return {error:err}
      })
    }
  }
}

module.exports = preguntaDB;