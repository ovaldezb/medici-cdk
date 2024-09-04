export const handler = async function(event:any) {
  const method = event.requestContext.httpMethod;
  
  
  if(method==='GET'){
    
    return{
      statusCode: 200,
      //body: JSON.stringify({"hub.challenge":event.queryStringParameters['hub.challenge']})
      body:event.queryStringParameters['hub.challenge']
    }
  }else if(method==='POST'){
    return{
      statusCode: 200,
      body: JSON.stringify('mensaje:ok')
    }
  }
  return{
    statusCode: 404,
    body: JSON.stringify('error:no valid method')
  }
}