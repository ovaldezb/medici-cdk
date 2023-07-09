import mongoose from "mongoose";
const Carnet = require('../models/carnet');
//const Paciente = 
require('../models/paciente');
require('../models/citas');

const carnetDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return {
    save:(params:any)=>{
      return new Carnet({
        fechaAlta: new Date(),
        noConsultasDisponibles: params.noConsultasDisponibles,
        citas:[],
        pacientes: params.pacientes
      })
      .save()
      .then((carnetSaved:any)=>{
        return {carnet: carnetSaved}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    },
    getCarnets:()=>{
      return Carnet.find()
        .populate('citas')
        .populate('pacientes')
        .then((allCarnets:any)=>{
          return {carnet:allCarnets}
        })
        .catch((err:any)=>{
          console.log(err);
          return{error:err}
        })
    },
    getCarnetById:(idCarnet:string)=>{
      return Carnet.find(
        {
          carnet:idCarnet
        }
      )
      .then((carnet:any)=>{
        return {carnet:carnet}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    updateCarnet:(carnetId:string, carnet:any)=>{
      return Carnet.findOneAndUpdate({_id:carnetId},carnet,{new:true})
      .then((carnetUpdate:any)=>{
        return {carnet:carnetUpdate}
      })
      .catch((err:any)=>{
        console.log(err);
        return{error:err}
      });
    }
  }
}

module.exports = carnetDB;