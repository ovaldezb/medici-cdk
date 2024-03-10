import mongoose, { mongo } from "mongoose";
var {Schema} = mongoose;
//const respuestaSeccion = require('../models/respuestaSeccion').schema;
const AntecedentesSchema = new Schema({
    id:String,
    /*paciente: {
      type : Schema.Types.ObjectId,
      ref: 'Paciente'
    },*/
    edoCivil: String,
    genero: String,
    ocupacion: String,
    pg1: Boolean,
    pg1Padecimiento: String,
    pg2: Boolean,
    pg2Padecimiento: String,
    pg3: Boolean,
    pg3Padecimiento: String,
    pg3Parentesco: String,
    respuestas: [{seccion:String, respuestas:[{noPregunta:String,valor:Boolean}]}]
});

module.exports = mongoose.model('Antecedente',AntecedentesSchema);