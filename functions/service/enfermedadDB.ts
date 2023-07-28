import mongoose from "mongoose";
const Enfermedad = require('../models/enfermedad');

const enfermedadDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return {
    getEnfermedadBySintoma:(sintoma:string)=>{
      return Enfermedad.find({sintomas:{$regex:sintoma,$options:'i'}})
      .then((listaEnfermedades:any)=>{
        return{
          enfermedades:listaEnfermedades
        }
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    }
  }
}

module.exports = enfermedadDB;