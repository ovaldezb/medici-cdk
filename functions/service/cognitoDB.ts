import mongoose from "mongoose";
const Usuario = require('../models/usuario');

const cognitoDB = (mongoUri:any)=>{
  mongoose.connect(mongoUri);

  return {
    saveNewUser:(params:any)=>{
      console.log('Va a guardar el usuario',params);
      return new Usuario({
        nombre: params.given_name,
        apellidoP: params.middle_name,
        apellidoM: params.family_name,
        email: params.email,
        telefono: params.phone_number,
        dob : params.birthdate,
        sexo: params.gender,
        //sucursal: params['custom:sucursal'],
        perfil: params['custom:perfil'],
        cedula: params['custom:cedula'],
        isAdmin: params['custom:isAdmin'],
        rfc : params['custom:rfc'],
        especialidad: params['custom:especialidad']
      })
      .save()
      .then((savedCognito:any)=>{
        console.log('Se guardo el usuario');
        return {usuario:savedCognito};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    }
  }

}

module.exports = cognitoDB;