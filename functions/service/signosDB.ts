import mongoose from 'mongoose';
const Signos = require('../models/signos');


const signosDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri);

  return{
    saveSignos:(params:any)=>{
      return  new Signos({
        paciente : params.paciente,
        peso : params.peso,
        estatura: params.estatura,
        presionSis : params.presionSis,
        presionDias : params.presionDias,
        temperatura : params.temperatura,
        fechaToma : params.fechaToma,
        frecuenciaCardiaca: params.frecuenciaCardiaca,
        frecuenciaRespiratoria: params.frecuenciaRespiratoria,
        spo2 : params.spo2,
        glucotest: params.glucotest,
        descripcion: params.descripcion,
        alergias: params.alergias,
        escalaDolor: params.escalaDolor,
        motivoConsulta: params.motivoConsulta
      }).save()
      .then((signosSaved:any) =>{
        return {signos:signosSaved};
      })
      .catch((err:any) =>{
        return {error:err};
      });
    },
    updateSignos:(idSignos:string,signos:any)=>{
      return Signos.findOneAndUpdate({_id:idSignos},signos,{new:true})
      .then((signosUpdated:any) =>{
        return {signos:signosUpdated};
      })
      .catch((err:any)=>{
        console.log('Error en update signos:',err);
        return {error:err};
      })
    }
  };
}

module.exports = signosDB;