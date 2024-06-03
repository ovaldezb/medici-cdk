const database = require('./service/preguntaAntFamDB');
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
      return getAllPreguntas();
    case 'POST':
      return saveRespuesta(event);
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function getAllPreguntas() {
  const preguntas = await db.loadAllQuestions();
  if(preguntas === null || preguntas.error != null){
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
    body: JSON.stringify(preguntas),
    headers:headers
  }
}

async function saveRespuesta(event:any) {
  const body = JSON.parse(event.body);
  const respuestaSaved = await db.saveRespuesta(body);
  if(respuestaSaved === null  || respuestaSaved.error != null){
    return{
      statusCode:400,
      body:JSON.stringify({
        message:'Error al guardar las respuestas '+respuestaSaved.error
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(respuestaSaved),
    headers:headers
  }
}