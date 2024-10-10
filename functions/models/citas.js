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
  horaCitaFin: Date,
  horaConsultaInicio:Date,
  isSignosTomados:Boolean,
  isAtendido: Boolean,
  medicamentoReceta:[{
    nombre:String,
    prescripcion:String
  }],
  exploracionFisica: String,
  diagnostico: String,
  tratamiento: [String],
  horaTomaSignos: Date,
  horaCreaCita: Date,
  noReceta: String,
  duracion: Number,
  isInterconsulta: Boolean,
  medicoInterconsulta:String,
  isIntConAtendido:Boolean,
});

module.exports = mongoose.model('Cita',CitasSchema);