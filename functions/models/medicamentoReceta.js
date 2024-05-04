import mongoose, { mongo } from "mongoose";
var { Schema } = mongoose;

const MedicamentoRecetaSchema = new Schema({
  nombre:String,
  prescripcion:String
});

module.exports = mongoose.model('MedicamentoReceta',MedicamentoRecetaSchema);