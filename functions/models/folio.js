'use strict'

import mongoose from 'mongoose';
var {Schema} = mongoose;

var FolioSchema = Schema({    
    id: String,
    sequence_value:Number,
    tipo:String,
    sucursal:String  
});

module.exports = mongoose.model('Folio',FolioSchema);