const database = require('./service/carnetDB');
const db = database(process.env.MONGODB_URI);
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async function (event:any) {
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'GET' :
      if(event.pathParameters != null && event.pathParameters.carnetId != null){
        return getCarnetById(event);
      }else if(event.queryStringParameters != null && event.queryStringParameters.secuencia != null){
        return getFolio(event);
      }else{
        return getCarnets();
      }
    case 'POST' :
      return addCarnet(event);
    case 'PUT' :
      return updateCarnet(event);
    default:
      throw new Error('Unsupported route '+method)
  }
}

async function addCarnet(event:any) {
  const body = JSON.parse(event.body);
  const savedCarnet = await db.save(body);
  if(savedCarnet===null || savedCarnet.error !=null){
    return{
      statusCode: 404,
      body: JSON.stringify({
        message:'Error al guardar el carnet'
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(savedCarnet),
    headers:headers
  }
}

async function getCarnets() {
  const carnets = await db.getCarnets();
  if(carnets === null || carnets.error !=null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al traer los carnets'
      }),
      headers:headers
    }  
  }
  return{
    statusCode: 200,
    body: JSON.stringify(carnets),
    headers:headers
  }
}

async function getCarnetById(event:any) {
  const carnetId = event.pathParameters.carnetId;
  const carnetById = await db.getCarnetById(carnetId);
  if(carnetById===null || carnetById.error != null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al traer el carnet by Id'
      }),
      headers:headers
    }  
  }
  return{
    statusCode: 200,
    body: JSON.stringify(carnetById),
    headers:headers
  }
}

async function updateCarnet(event:any) {
  const carnetId = event.pathParameters.carnetId;
  const body = JSON.parse(event.body);
  const updatedCarnet = await db.updateCarnet(carnetId,body);
  if(updatedCarnet === null || updatedCarnet.error != null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al actualizar el carnet '+carnetId
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(updatedCarnet),
    headers:headers
  }
}

async function getFolio(event:any) {
  const secuencia = event.queryStringParameters.secuencia; 
  const folio = await db.getFolio(secuencia);
  if(folio != null && folio.error != null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al obtener el folio '
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