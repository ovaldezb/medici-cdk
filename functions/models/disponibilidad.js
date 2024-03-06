'use strict'

import mongoose from 'mongoose';
var { Schema } = mongoose;

var DisponibilidadSchema = Schema({
  id:String,
  medico: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },
  dia:Date,
  horaInicio:String,
  horaFin: String
});

module.exports = mongoose.model('Disponibilidad',DisponibilidadSchema);