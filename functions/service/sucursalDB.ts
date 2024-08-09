import mongoose from "mongoose";
const Sucursal = require('../models/sucursal');

const sucursalDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri);

  return{
    save:(params:any)=>{
      return new Sucursal({
        identificador:params.identificador,
        direccion: params.direccion,
        codigoPostal: params.codigoPostal,
        nombreAdmin: params.nombreAdmin,
        telefono: params.telefono,
        isEnabled: params.isEnabled
      })
      .save()
      .then((sucursalSaved:any)=>{
        return {sucursal:sucursalSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    getAllSucursales:()=>{
      return Sucursal.find()
      .then((allSucFound:any)=>{
        return{sucursales:allSucFound};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    getSucById:(idSucursal:string)=>{
      return Sucursal.findOne({_id:idSucursal})
            .then((sucursalFound:any)=>{
              return {sucursal:sucursalFound};
            })
            .catch((err:any)=>{
              console.log(err);
              return {error:err};
            });
    },
    update:(idSucursal:string,sucursal:any)=>{
      return Sucursal.findOneAndUpdate({_id:idSucursal},sucursal,{new:true})
        .then((sucUpdated:any)=>{
          return {sucursal:sucUpdated};
        })
        .catch((err:any)=>{
          console.log(err);
          return {error:err};
        })
    },
    delete:(idSucursal:string)=>{
      return Sucursal.findOneAndDelete({_id:idSucursal})
        .then((deleteSuc:any)=>{
          return {sucursal:deleteSuc};
        })
        .catch((err:any)=>{
          console.log(err);
          return {error:err};
        })
    }
  }
}

module.exports = sucursalDB;