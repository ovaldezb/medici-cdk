const database = require('./service/recetaDB');
const db = database(process.env.MONGODB_URI);
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async function(event:any) {
  const method = event.requestContext.httpMethod;
  console.log(event.body);
  switch(method){
    case 'GET':
      if(event.pathParameters != null){
        return getRecetaByPaciente(event.pathParameters.idPaciente);
      }
    case 'POST':
      return addReceta(event.body);
    default:
      throw new Error('Unsupported route'+method);
  }
}

async function addReceta(body:any) {
  console.log(body);
  const recetaBody = JSON.parse(body);
  const receta = await db.save(recetaBody);
  if(receta === null || receta.error != null){
    return {
      statusCode:404,
      body:JSON.stringify({message:'Error al guardar la receta'}),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(receta),
    headers:headers
  }
}

async function getRecetaByPaciente(idPaciente:string) {
  const receta = await db.recetaByPaciente(idPaciente);
  if(receta === null || receta.error != null){
    return {
      statusCode:404,
      body:JSON.stringify({message:'Error al buscar la receta por pacuente'}),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(receta),
    headers:headers
  }
}