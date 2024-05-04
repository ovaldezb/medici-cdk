import mongoose from "mongoose";
import MedicamentoReceta from './medicamentoReceta';
var { Schema } = mongoose;


const RecetaSchema = new Schema({
  id:String,
  paciente:{
    type: Schema.Types.ObjectId,
    ref:'Paciente'
  },
  cita:{
    type: Schema.Types.ObjectId,
    ref:'Cita'
  },
  medicamentoReceta:[{
    nombre:String,
    prescripcion:String
  }],
  fechaReceta:Date
});

module.exports = mongoose.model('Receta', RecetaSchema);