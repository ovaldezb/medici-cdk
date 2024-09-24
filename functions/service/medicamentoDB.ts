import mongoose from "mongoose";
const Medicamento = require("../models/medicamento");

const medicamentoDB = (mongoUri: string)=>{
  mongoose.connect(mongoUri,{});
  return {
    save: (medicamento:any)=>{
      return new Medicamento({
        familia: medicamento.familia,
        nombre: medicamento.nombre,
        dosisAdulto: medicamento.dosisAdulto,
        dosisNino: medicamento.dosisNino,
        dosisMaxima: medicamento.dosisMaxima,
        indicaciones: medicamento.indicaciones,
        contraIndicaciones: medicamento.contraIndicaciones,
        presentaciones: medicamento.presentaciones
      }).save()
      .then((medicamentoSaved:any)=>{
        return {medicamento:medicamentoSaved};
      })
      .catch((err:any)=>{
        console.log('Error al guardar medicamento',err);
        return {error:err};
      })
    },
    count:()=>{
      return Medicamento.find({})
      .countDocuments()
      .then((count:any)=>{
        return {count}
      })
      .catch((err:any)=>{
        console.log('Error al hacer el count',err);
        return{error:err};
      });
    },
    getAllMedicamentos:(offset:number,size:number)=>{
      
      return Medicamento.find()
      .limit(size)
      .skip(size * offset)
      .then((listaMedicamentos:any)=>{
        return { medicamentos:listaMedicamentos};
      })
      .catch((err:any)=>{
        console.log('Error al obtener lista de medicamentos ',err);
        return{
          error:err
        }
      });
    },
    getMedicByNombre:(nombre:string)=>{
      return Medicamento.find({nombre:{$regex:'^'+nombre,$options:'i'},})
      .then((listaMedicamentos:any)=>{
        return {medicamentos:listaMedicamentos};
      })
    }, updateMedicamento:(idMedicamento:string, medicamento:any)=>{
      return Medicamento.findOneAndUpdate({_id:idMedicamento},medicamento,{new:true})
      .then((medicamentoUpdt:any)=>{
        return {medicamento:medicamentoUpdt};
      })
      .catch((err:any)=>{
        console.log('Error al actualizar medicamento',err);
        return{error:err};
      });
    }
  }
}

module.exports = medicamentoDB;