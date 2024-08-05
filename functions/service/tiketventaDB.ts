import mongoose from "mongoose";
const TicketVenta = require('../models/ticketVenta');
const ticketVentaDB = (mongoUri: string)=>{
  mongoose.connect(mongoUri);
  return {
    getTicket:()=>{
      const numeroTicket = TicketVenta.findOne({sucursal:'SUC001'});
      TicketVenta.findOneAndUpdate({_id:numeroTicket._id},{$inc:{numeroTicket:1}}) ;
      if(numeroTicket!=null){
        return numeroTicket;
      }else{
        return {error:'No se puedo obtener el ticket'};
      }
      
    }
  }
}

module.exports = ticketVentaDB;