import fetch from 'node-fetch';
import { json } from 'stream/consumers';

const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : 'true',
  'Content-Type': 'application/json',
  'user':'',
  'password':''
};

export const handler = async function (event:any) {
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'POST':
      return getToken();
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function getToken() {
  let response = await fetch('https://services.test.sw.com.mx/security/authenticate', {
    method: 'POST',
    headers: headers
  });
  let resp = await response.json();
  return {
    statusCode:200,
    body:JSON.stringify(resp)
  };
  /*.then((response:any) => {
    console.log(response);
    return response.json();
  }).catch((err:any) => {console.log(err);});
  */
}