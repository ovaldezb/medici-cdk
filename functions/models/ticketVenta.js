import mongoose from "mongoose";
var { Schema } = mongoose;

const TicketVenta = new Schema({
  id:String,
  numero:Number,
  sucursal:String
});

module.exports = mongoose.model('TicketVenta',TicketVenta);