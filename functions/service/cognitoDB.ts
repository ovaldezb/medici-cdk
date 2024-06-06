import mongoose from "mongoose";
const Usuario = require('../models/usuario');

const cognitoDB = (mongoUri:any)=>{
  mongoose.connect(mongoUri);

  return {
    saveNewUser:(params:any)=>{
      return new Usuario({
        nombre: params.given_name,
        apellidoP: params.middle_name,
        apellidoM: params.family_name,
        email: params.email,
        telefono: params.phone_number,
        dob : params.birthdate,
        sexo: params.gender,
        perfil: params['custom:perfil'],
        cedula: params['custom:cedula'],
        isAdmin: params['custom:isAdmin'],
        rfc : params['custom:rfc'],
        especialidad: params['custom:especialidad'],
        isDisabled: params['custom:isDisabled'],
        sucursal: params['custom:sucursal']
      })
      .save()
      .then((savedCognito:any)=>{
        return {usuario:savedCognito};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    existsUserByEmail:(email:string)=>{
      return Usuario.findOne({email:email})
      .then((usuario:any)=>{
        if(usuario === null){
          return false;
        }else{
          return true;
        }
      })
      .catch((err:any)=>{
        console.log('Usuario no encontrado '+err);
        return err;
      });
    }
  }

}

module.exports = cognitoDB;