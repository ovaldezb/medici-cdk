import mongoose from 'mongoose';
var { Schema } = mongoose;

const SignosSchema = new Schema({
  id:String,
  paciente: {
    type: Schema.Types.ObjectId,
    ref: "Paciente"
  },
  peso: Number,
  estatura: Number,
  presionSis: Number,
  presionDias: Number,
  temperatura: Number,
  fechaToma: Date,
  frecuenciaCardiaca: Number,
  frecuenciaRespiratoria: Number,
  spo2: Number,
  glucotest: Number,
  motivoConsulta: String,
  alergias: String,
  escalaDolor: Number
});

module.exports  = mongoose.model('Signos',SignosSchema);