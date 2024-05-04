import mongoose from "mongoose";
const Receta = require('../models/receta');

const recetaDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return{
    save:(body:any)=>{
      return new Receta({
        paciente: body.paciente,
        cita: body.cita,
        medicamentoReceta:body.medicamentoReceta,
        fechaReceta:body.fechaReceta
      })
      .save()
      .then((recetaSaved:any)=>{
        return {receta:recetaSaved}
      })
      .catch((err:any)=>{
        console.log(err);
        return { error:err}
      })
    },
    recetaByPaciente:(idPaciente:string)=>{
      return Receta.find(
        {
          paciente:idPaciente          
        })
      .populate('cita')
      .populate('paciente')
      .then((recetaPaciente:any)=>{
        return {receta:recetaPaciente}
      })
      .catch((err:any)=>{
        return {error:err}
      })
    }
  }
}

module.exports = recetaDB;