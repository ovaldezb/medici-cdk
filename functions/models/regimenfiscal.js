import mongoose from 'mongoose';
var { Schema } = mongoose;

const RegimenFiscalSchema = new Schema({
  id:String,
  regimenfiscal:String,
  descripcion:String,
  fisica:Boolean,
  moral:Boolean
});

module.exports = mongoose.model('RegimenFiscal',RegimenFiscalSchema);