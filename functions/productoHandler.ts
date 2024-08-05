const database = require('./service/productoDB');
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
      let action = event.queryStringParameters.action;
      if(action==='codigo'){
        return getProductoByCodigo(event.pathParameters.codigo);
      }else if(action==='desc'){
        return getProductoByDesc(event.pathParameters.codigo);
      }
      
    case 'POST':
      return addProducto(event);
    case 'PUT':
      return updateProducto(event.pathParameters.codigo,event.body);
    case 'DELETE':
      return deleteProducto(event.pathParameters.codigo);
    default:
      throw new Error("Unsupported route "+method);
  }
}

async function getProductoByCodigo(codigoBarras:string) {
  const producto = await db.findProductoByCodigoBarras(Number(codigoBarras));
  if(producto === null || producto.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(producto),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(producto),
    headers:headers
  }
}

async function getProductoByDesc(desc:string) {
  const productos = await db.findProductoByDesc(desc);
  if(productos===null || productos.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(productos.error),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(productos),
    headers:headers
  }
}

async function addProducto(event:any) {
  let body = JSON.parse(event.body);
  const productoAdd = await db.save(body);
  if(productoAdd===null || productoAdd.error!=null){
    return {
      statusCode:404,
      body:JSON.stringify(productoAdd),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(productoAdd),
    headers:headers
  }
}

async function updateProducto(idProducto:string, body:any) {
  const producto = await db.updateProducto(idProducto,JSON.parse(body));
  if(producto===null || producto.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(producto),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(producto),
    headers:headers
  }
}

async function deleteProducto(idProducto:string) {
  const producto = await db.deleteProducto(idProducto);
  if(producto===null || producto.error != null){
    return {
      statusCode:404,
      body:JSON.stringify(producto),
      headers:headers
    }
  }
  return {
    statusCode:200,
    body:JSON.stringify(producto),
    headers:headers
  }
}

