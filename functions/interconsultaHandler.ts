const database = require('./service/interconsultaDB');
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
      return getInterconsultas(event);
    default:
      throw new Error('Unsupported route'+method);
  }
}

async function getInterconsultas(event:any) {
  const fechaFiltro = event.pathParameters.fechaFiltro;
  const interconsultas = await db.getListaInterConsulta(fechaFiltro);
  if(interconsultas ===null || interconsultas.error!=null){
    return{
      statusCode:200,
      body:JSON.stringify({
        message:'Error al obtener interconsultas '+interconsultas.error
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body:JSON.stringify(interconsultas),
    headers:headers
  }
}