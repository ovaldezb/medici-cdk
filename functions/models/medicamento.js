var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Medicamento = new Schema({
  id:String,
  familia:String,
  nombre:String,
  dosisAdulto:String,
  dosisNino: String,
  dosisMaxima: String,
  indicaciones: String,
  contraIndicaciones: String,
  presentaciones: String
});

module.exports = mongoose.model('Medicamento', Medicamento);