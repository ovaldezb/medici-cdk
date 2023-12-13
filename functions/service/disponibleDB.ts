import mongoose from "mongoose";
const Disponibilidad = require('../models/disponibilidad');
require('../models/usuario');

const disponibleDB = (mongoUri: string)=>{
  mongoose.connect(mongoUri,{});
  return{
    save: (params:any)=>{
      return new Disponibilidad({
        medico:params.medico,
        dia:params.dia,
        horaInicio:params.horaInicio,
        horaFin:params.horaFin
      })
      .save()
      .then((dispoSaved:any)=>{
        return {disponibilidad:dispoSaved}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    },
    getDispoByMedicoAndFecha:(idMedico:any,fechaIni:string,fechaFin:string)=>{
      return Disponibilidad.find(
        {
          dia:{'$gte':`${fechaIni}T00:00:00.000Z`,'$lt':`${fechaFin}T00:00:00.000Z`},
          medico:{_id:idMedico}
        })
        .populate('medico')
        .then((diasDispo:any)=>{
          return {disponibilidad:diasDispo};
        })
        .catch((err:any)=>{
          console.log(err);
          return {error:err};
        })
    },
    deleteDispoById:(idDispo:any)=>{
      return Disponibilidad.findOneAndDelete({_id:idDispo})
      .then((deletedDispo:any)=>{
        return deletedDispo;
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    }
  }
}

module.exports = disponibleDB;