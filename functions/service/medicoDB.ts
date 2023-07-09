import mongoose from 'mongoose';
const Usuario = require('../models/usuario');

const medicoDB = (mongoUri:string)=>{
  const connectionHandler = mongoose.connect(mongoUri);

  return {
    close: ()=>{
      mongoose.connection.close();
    },
    getMedicoByEmail:(email:string)=>{
      return Usuario.find({email:email})
      .then((medico:any) =>{
        return {medico:medico};
      }).catch((err:any)=>{
        return err;
      });
    },
    getAllMedicos:()=>{
      return Usuario.find({perfil:'MEDICO'})
      .then((medicos:any) =>{
        return {medicos:medicos};
      })
      .catch((error:any) =>{
        console.log(error)
        return {error:error};
      })
    }
  }
}

module.exports = medicoDB;