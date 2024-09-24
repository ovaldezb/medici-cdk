import mongoose from "mongoose";
const Cita = require('../models/citas');

const interConsltaDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return {
    getListaInterConsulta:(fechaFiltro:string)=>{
      return Cita.find(
        {
          fechaCita:{'$gte':`${fechaFiltro}T00:00:00.000Z`,'$lt':`${fechaFiltro}T23:59:59.999Z`},
          isInterconsulta:true
        })
      .sort({horaCita:1})
      .then((citasInterCons:any)=>{
        return { citas:citasInterCons}
      })
      .catch((err:any)=>{
        console.log('Error en obtener interconsultas',err)
        return{error:err};
      })
    },
  };

}

module.exports = interConsltaDB;