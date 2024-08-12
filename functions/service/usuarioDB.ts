import mongoose from "mongoose";
const Usuario = require('../models/usuario');

const usuariosDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{ });
  return{
    getAllUsers:()=>{
      return Usuario.find()
      .then((listaUsuarios:any)=>{
        return {usuarios:listaUsuarios}
      })
      .catch((error:any)=>{
        console.log(error);
        return {error:error}
      })
    },
    updateUserDB:(idUsuario:string, usuario:any)=>{
      return Usuario.findOneAndUpdate({_id:idUsuario},usuario,{new:true})
      .then((updatedUsuario:any)=>{
        return updatedUsuario;
      })
      .catch((error:any)=>{
        console.log(error);
        return {error:error}
      })
    }
  }

}

module.exports = usuariosDB;