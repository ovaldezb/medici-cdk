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
        return err;
      })
    },
    getMedicByNombre:(nombre:string)=>{
      return Medicamento.find({nombre:{$regex:'^'+nombre,$options:'i'},})
      .then((listaMedicamentos:any)=>{
        return {medicamentos:listaMedicamentos};
      })
    }
  }
}

module.exports = medicamentoDB;