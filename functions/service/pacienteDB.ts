import mongoose from 'mongoose';
const Paciente = require('../models/paciente');


const pacienteDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri);
  return {
    close:()=>{
      mongoose.connection.close();
    },
    savePaciente:(paciente:any)=>{
      return new Paciente({
        nombre : paciente.nombre,
        apellidoP : paciente.apellidoP,
        apellidoM : paciente.apellidoM,
        telefono : paciente.telefono,
        fechaNacimiento : paciente.fechaNacimiento,
        correo: paciente.correo,
        sexo : paciente.sexo,
        carnet: paciente.carnet,
        ocupacion: paciente.ocupacion,
        escolaridad:paciente.escolaridad,
        raza: paciente.raza,
        codigoPostal: paciente.codigoPostal
      }).save()
      .then((pacienteSaved:any)=>{
        return {paciente:pacienteSaved};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    },
    findAllPacientes:()=>{
      return Paciente.find()
      .then((listaPacientes:any)=>{
        return {pacientes:listaPacientes};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    findPacienteById:(idPaciente:string)=>{
      return Paciente.findById(idPaciente)
      .then((paciente:any)=>{
        return {paciente: paciente}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      });
    },
    findPacienteByNombre:(req:any)=>{
      var lookUpNombre = req.pathParameters.nombre;
      return Paciente.find({nombre:{$regex:'^'+lookUpNombre,$options: 'i' },})
      .then((listaPacienteMatch:any) =>{
        return {pacientes:listaPacienteMatch};
      })
      .catch((err:any)=>{
        console.log(err)
        return {error:err};
      });
    },
    findPacienteByApellido:(req:any)=>{
      var lookUpApellido = req.pathParameters.apellido;
      return Paciente.find({apellidoP:{$regex:'^'+lookUpApellido,$options: 'i' },})
      .then((listaPacienteMatch:any) =>{
        return {pacientes:listaPacienteMatch};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    findPacienteByTelefono:(req:any)=>{
      var lookUpTelefono = req.pathParameters.telefono;
      return Paciente.find({telefono:{$regex:'^'+lookUpTelefono,$options: 'i' },})
      .then((listaPacienteMatch:any) =>{
        return {pacientes:listaPacienteMatch};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    updatePacienteDB:(req:any)=>{
      let idPaciente = req.pathParameters.idPaciente;
      return Paciente.findOneAndUpdate({_id:idPaciente},JSON.parse(req.body),{new:true})
      .then((pacienteUpdated:any) =>{
        return {pacientes:pacienteUpdated};
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },deletePacienteDB:(req:any)=>{
      let idPaciente = req.pathParameters.idPaciente;
      return Paciente.findOneAndDelete({_id:idPaciente})
      .then((pacienteDeleted:any) =>{
        return pacienteDeleted;
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      })
    }
  };
}

module.exports = pacienteDB;