'use strict'

import mongoose from 'mongoose';
var {Schema} = mongoose;

var FolioSchema = Schema({    
    _id: String,
    sequence_value:Number    
});

module.exports = mongoose.model('Folio',FolioSchema);