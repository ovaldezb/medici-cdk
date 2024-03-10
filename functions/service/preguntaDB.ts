import mongoose from "mongoose";
const Pregunta = require('../models/preguntas');
const Antecedentes = require('../models/antecedentes')

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
    },
    saveAntecedentes:(antecedentes:any)=>{
      return new Antecedentes({
        edoCivil: antecedentes.edoCivil,
        genero: antecedentes.genero,
        ocupacion: antecedentes.ocupacion,
        pg1: antecedentes.pg1,
        pg1Padecimiento:antecedentes.pg1Padecimiento,
        pg2: antecedentes.pg2,
        pg2Padecimiento: antecedentes.pg2Padecimiento,
        pg3: antecedentes.pg3,
        pg3Padecimiento: antecedentes.pg3Padecimiento,
        pg3Parentesco: antecedentes.pg3Parentesco,
        respuestas: antecedentes.respuestas
      })
      .save()
      .then((antSaved:any)=>{
        return {antecedentes:antSaved}
      })
      .catch((err:any)=>{
        return {error:err};
      })
    },
    updateAntecedente:(event:any)=>{
      const idAntecedente = event.pathParameters.idAntecedente;
      const bodyAntecedente = JSON.parse(event.body);
      return Antecedentes.findOneAndUpdate({_id:idAntecedente},bodyAntecedente,{new:true})
      .then((antecedenteUpdate:any)=>{
        return {antecedente:antecedenteUpdate}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    }
  }
}

module.exports = preguntaDB;