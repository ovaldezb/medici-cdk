import mongoose from "mongoose";
var { Schema } = mongoose;

const EnfermedadSchema = new Schema({
  id: String,
  fechaAlta: Date,
  patologia: String,
  sintomas: String
});

module.exports = mongoose.model('Enfermedad1', EnfermedadSchema);