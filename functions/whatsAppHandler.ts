export const handler = async function(event:any) {
  const method = event.requestContext.httpMethod;
  console.log('Method',method);
  console.log(event);
  if(method==='GET'){
    console.log('En el Get');
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