const database = require('./service/enfermedadDB');
const db = database(process.env.MONGODB_URI);
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async function(event:any) {
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'GET' :
      return getEnfermedadBySintoma(event);
    default:
    throw new Error('Unsupported route '+method)
  }
}

async function getEnfermedadBySintoma(event:any) {
  const sintoma = event.pathParameters.sintomas;
  const listaEnfermedades = await db.getEnfermedadBySintoma(sintoma);
  if(listaEnfermedades === null || listaEnfermedades.error != null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al obtener la lista de enfermedades'
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(listaEnfermedades),
    headers:headers
  }
}