import mongoose from "mongoose";
var { Schema } = mongoose;

const FormaPagoSchema = new Schema({
  id:String,
  formapago:String,
  descripcion:String
});

module.exports = mongoose.model('FormaPago',FormaPagoSchema);