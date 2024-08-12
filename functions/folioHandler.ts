const database = require('./service/folioDB');
const db = database(process.env.MONGODB_URI);
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async function(event:any){
  const method = event.requestContext.httpMethod;
  console.log(event);
  switch(method){
    case 'GET':
      let tipo = event.pathParameters.tipo;
      let sucursal = event.pathParameters.sucursal;
      return obtieneFolio(tipo, sucursal);
    case 'POST':
      return creaFolios(event);
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function obtieneFolio(tipo:string, sucursal:string) {
  const folio = await db.getFolio(tipo, sucursal);
  if(folio===null || folio.error != null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al crear folio '+folio
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(folio),
    headers:headers
  }
}

async function creaFolios(event:any) {
  let bodyFolio = JSON.parse(event.body);
  console.log(bodyFolio);
  const folio = await db.addFolio(bodyFolio);
  if(folio===null || folio.error != null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al crear folio '+folio
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(folio),
    headers:headers
  }
}