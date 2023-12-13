const database = require('./service/disponibleDB');
const db = database(process.env.MONGODB_URI);
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};
require('./models/usuario');

export const handler = async function(event:any) {
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'POST':
      return addDisponibilidad(event);
    case 'GET':
      return getDispoByDiaAndMedico(event.pathParameters.fechaIni,event.pathParameters.fechaFin,event.pathParameters.idMedico);
    case 'DELETE':
      return deleteById(event.pathParameters.fechaIni);
    default:
      throw new Error('Unsupported Method');
  }
}

async function getDispoByDiaAndMedico(fechaIni:string,fechaFin:string,idMedico:string) {
  const getDispo = await db.getDispoByMedicoAndFecha(idMedico,fechaIni,fechaFin);
  if(getDispo === null || getDispo.error != null){
    return{
      statusCode:404,
      body:JSON.stringify({
        message:'No existe disponibilidada para éste médico'
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(getDispo),
    headers:headers 
  }
}

async function addDisponibilidad(event:any) {
  const body = JSON.parse(event.body);
  const savedDispo = await db.save(body);
  if(savedDispo === null || savedDispo.error != null){
    return{
      statusCode:400,
      body:JSON.stringify({
        message:'No se pudo guardar la disponibilidad '+savedDispo.error
      }),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body: JSON.stringify(savedDispo),
    headers:headers
  }
}

async function deleteById(idDisponibilidad:string) {
  const deletedDispo = await db.deleteDispoById(idDisponibilidad);
  if(deletedDispo === null || deletedDispo.error != null){
    return {
      statusCode:400,
      body:JSON.stringify({
        message:'Error al borrar la disponibilidad '+deletedDispo.error
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(deletedDispo),
    headers:headers
  }
}