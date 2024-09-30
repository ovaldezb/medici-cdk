import mongoose from "mongoose";
var { Schema } = mongoose;

const UsoCfdiSchema = new Schema({
  id:String,
  usoCfdi:String,
  descripcion:String,
  regfiscalreceptor:String,
  fisica:Boolean,
  moral:Boolean
});

module.exports = mongoose.model('UsoCfdi',UsoCfdiSchema);