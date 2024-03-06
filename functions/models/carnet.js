import mongoose from "mongoose";
var { Schema } = mongoose;

const CarnetSchema = new Schema({
  id:String,
  folio: String,
  fechaAlta: Date,
  noConsultasDisponibles: Number,
  citas: [
    {
      type: Schema.Types.ObjectId, 
      ref: "Cita"
    }
  ],
  pacientes:[
    {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      required:[true,"{VALUE} no puede ser null"]
    }
  ]
});

module.exports = mongoose.model('Carnet',CarnetSchema);