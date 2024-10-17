import mongoose from "mongoose";
const Folio = require('../models/folio');

const folioDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return {
    addFolio:(folio:any)=>{
      return new Folio({
        sequence_value:folio.sequence_value,
        tipo:folio.tipo,
        sucursal:folio.sucursal
      })
      .save()
      .then((folioSaved:any)=>{
        return {folio:folioSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return{error:err};
      })
    },
    getFolio:(tipo:string, sucursal:string)=>{
      return Folio.findOneAndUpdate(
        {tipo:tipo, sucursal:sucursal},
        {$inc:{sequence_value:1}},
        {new : true})
        .then((folioFound:any)=>{
          return {folio:folioFound};
        })
        .catch((err:any)=>{
          console.log(err);
          return {error:err};
        })
    },
    readFolio:(tipo:string, sucursal:string)=>{
      return Folio.findOne(
        {tipo:tipo, sucursal:sucursal},
        {new : true})
        .then((folioFound:any)=>{
          return {folio:folioFound};
        })
        .catch((err:any)=>{
          console.log(err);
          return {error:err};
        })
    }
  };
}

module.exports = folioDB;