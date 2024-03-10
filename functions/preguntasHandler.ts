const database = require('./service/preguntaDB');
const db = database(process.env.MONGODB_URI);
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async function(event:any){
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'GET':
      return getPreguntas(event);
    case 'POST':
      return insertaAntecedentes(event);
    case 'PUT':
      return updtAntecedentes(event);
    default:
     throw new Error('Unsupported route '+method)
  }
}

async function getPreguntas(event:any) {
  const seccion = event.pathParameters.seccion;
  const listaPreguntas = await db.loadQuestions(seccion);
  if(listaPreguntas === null || listaPreguntas.error != null){
    return{
      statusCode:404,
      body:JSON.stringify({
        message:'Error al recuperar las preguntas'
      }),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body: JSON.stringify(listaPreguntas),
    headers:headers
  }
}

async function insertaAntecedentes(event:any) {
  const body = JSON.parse(event.body);
  const antecedInserted = await db.saveAntecedentes(body);
  if(antecedInserted.error || antecedInserted=== null ){
    return{
      statusCode:400,
      body:JSON.stringify({
        message:'Error al guardar los antecedentes '+antecedInserted.error
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(antecedInserted),
    headers:headers
  }
}

async function updtAntecedentes(event:any) {
  const antecedentesActualizados = await db.updateAntecedente(event);
  if(antecedentesActualizados.error || antecedentesActualizados===null){
    return {
      statusCode:400,
      body:JSON.stringify({message:'Error al actualizar antecedentes'}),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(antecedentesActualizados),
    headers:headers
  }
}