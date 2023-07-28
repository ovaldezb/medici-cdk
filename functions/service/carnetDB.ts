import mongoose from "mongoose";
const Carnet = require('../models/carnet');
const Folio = require('../models/folio');
require('../models/paciente');
require('../models/citas');

const carnetDB = (mongoUri:string)=>{
  mongoose.connect(mongoUri,{});
  return {
    save:(params:any)=>{
      return new Carnet({
        fechaAlta: new Date(),
        noConsultasDisponibles: params.noConsultasDisponibles,
        citas:[],
        pacientes: params.pacientes
      })
      .save()
      .then((carnetSaved:any)=>{
        return {carnet: carnetSaved}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    },
    getCarnets:()=>{
      return Carnet.find()
        .populate('citas')
        .populate('pacientes')
        .then((allCarnets:any)=>{
          return {carnet:allCarnets}
        })
        .catch((err:any)=>{
          console.log(err);
          return{error:err}
        })
    },
    getCarnetById:(idCarnet:string)=>{
      return Carnet.find(
        {
          _id:idCarnet
        }
      )
      .then((carnet:any)=>{
        return {carnet:carnet}
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err};
      });
    },
    updateCarnet:(carnetId:string, carnet:any)=>{
      return Carnet.findOneAndUpdate({_id:carnetId},carnet,{new:true})
      .then((carnetUpdate:any)=>{
        return {carnet:carnetUpdate}
      })
      .catch((err:any)=>{
        console.log(err);
        return{error:err}
      });
    },
    getFolio:(nombre:string)=>{
      return Folio.findOneAndUpdate({'_id':nombre},{$inc:{sequence_value:1}},{new:true})
      .then((folioFound:any)=>{
        if(folioFound !=null && folioFound!= undefined && folioFound != ''){
          const ff = folioFound.sequence_value
          return {
            folio:pad(ff,5,'0')
          }
        }else{
          return new Folio({
                  _id : nombre,
                  sequence_value : 1
                })
          .save()
          .then((folioSaved:any)=>{
            return {
              folio:pad(folioSaved.sequence_value,5,'0')
            }
          })
          .catch((err:any)=>{
            return {error:err}
          })
        }
      })
      .catch((err:any)=>{
        console.log(err);
        return {error:err}
      })
    }
  }
}

const pad = (numero:number, width:number, fill:string)=>{
  var z = fill || '0';
  var n = numero + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = carnetDB;