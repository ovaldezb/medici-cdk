const database = require('./service/medicoDB');
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
      if(event.pathParameters != null ){
        return getMedicoByEmail(event.pathParameters.email);
      }else{
        return getAllMedicos();
      }
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function getMedicoByEmail(idMedico:string){
  const medico = await db.getMedicoByEmail(idMedico);
  if(medico === null){
    var errMessage = {
      message:'No existen medico para este id'
    };
    return{
      statusCode: 404,
      body: JSON.stringify(errMessage),
      headers:headers
    }  
  }
  return{
    statusCode: 200,
    body: JSON.stringify(medico),
    headers:headers
  }
}

async function getAllMedicos() {
  const medicos = await db.getAllMedicos();
  if(medicos === null){
    return{
      statusCode: 404,
      body: JSON.stringify({
        message:'Error al recuperar los Médicos'
      }),
      headers:headers
    }  
  }
  return{
    statusCode: 200,
    body: JSON.stringify(medicos),
    headers:headers
  }
}


