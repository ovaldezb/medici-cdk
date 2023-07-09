const database = require('./service/sucursalDB');
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
      return getAllSucursales();
    case 'POST' :
      return saveSucursal(event);
    case 'PUT' :
      return updateSucursal(event);
    case 'DELETE' :
      return deleteSucursal(event);
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function getAllSucursales() {
  const sucursales = await db.getAllSucursales();
  if(sucursales.error || sucursales==null){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al obtener sucursales '+sucursales.error
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(sucursales),
    headers:headers
  }
}

async function saveSucursal(event:any) {
  const body = JSON.parse(event.body);
  const savedSuc = await db.save(body);
  if(savedSuc === null || savedSuc.error){
    return{
      statusCode: 400,
      body: JSON.stringify({
        message:'Error al guardar la sucursal '+savedSuc.error
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(savedSuc),
    headers:headers
  }
}

async function updateSucursal(event:any) {
  const body = JSON.parse(event.body);
  const idSucursal = event.pathParameters.idSucursal;
  const updateSuc = await db.update(idSucursal,body);
  if(updateSuc===null || updateSuc.error){
    return{
      statusCode: 404,
      body: JSON.stringify({
        message : 'Error al actualizar la sucursal '+idSucursal+' '+updateSuc.error
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body: JSON.stringify(updateSuc),
    headers:headers,
  }
}

async function deleteSucursal(event:any) {
  const idSucursal = event.pathParameters.idSucursal;
  const deleteSuc = await db.delete(idSucursal);
  if(deleteSuc === null || deleteSuc.error){
    return{
      statusCode: 404,
      body: JSON.stringify({
        message : 'Error al eliminar la sucursal '+idSucursal+' '+deleteSuc.error
      }),
      headers:headers
    }
  }
  return{
    statusCode:200,
    body: JSON.stringify(deleteSuc),
    headers:headers,
  }
}