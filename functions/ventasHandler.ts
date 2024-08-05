const database = require('../service/ventaDB');
const db = database(process.env.MONGODB_URI);

const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

export const handler = async (event:any) => {
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'GET':
      let action = event.queryStringParameters.action;
      if(action==='ticket'){
        return getTicketConsecutivo();
      }
      default:
        throw new Error("Unsupported route "+method);
  }
}

async function getTicketConsecutivo() {
  const ticketVenta = await db.getTicket();
  if(ticketVenta===null || ticketVenta.error!=null){
    return {
      statusCode:404,
      body:JSON.stringify(ticketVenta),
      headers:headers
    } 
  }
  return {
    statusCode:200,
    body:JSON.stringify(ticketVenta),
    headers:headers
  }
}