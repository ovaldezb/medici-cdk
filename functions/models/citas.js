import mongoose from "mongoose";
var { Schema } = mongoose;

const CitasSchema = new Schema({
  id:String,
  paciente: {
    type: Schema.Types.ObjectId,
    ref: "Paciente",
    required:[true,"{VALUE} no puede ser null"]
  },
  medico : {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required:[true,"{VALUE} no puede ser null"]
  },
  signos:[{
    type: Schema.Types.ObjectId,
    ref: 'Signos'
  }],
  fechaCita: Date,
  horaCita: String,
  horaCitaFin: String,
  duracion: Number,
  isSignosTomados:Boolean,
  isAtendido: Boolean,
  medicamentoReceta:[{
    nombre:String,
    prescripcion:String
  }],
  exploracionFisica: String,
  diagnostico: String,
  tratamiento: String
});

module.exports = mongoose.model('Cita',CitasSchema);