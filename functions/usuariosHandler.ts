import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
const database = require('./service/usuarioDB');
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
    case 'GET':
      return getAllUsuarios();
    case 'PUT':
      if(event.pathParameters.isDisabled==='true'){
        disableUsuarioFromCognito(event);
      }else{
        enableUsuarioFromCognito(event);
      }
      return updateUsuario(event);
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function getAllUsuarios() {
  const listaUsuario = await db.getAllUsers();
  if(listaUsuario.error != null || listaUsuario === null){
    return{
      statusCode: 404,
      body: JSON.stringify({
        message:'Error al tratar de traer todos los usuarios'
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(listaUsuario),
    headers:headers
  }
}

async function updateUsuario(event:any) {
  const idUsuario = event.pathParameters.idUsuario;
  const body = JSON.parse(event.body);
  const updateUsuario = await db.updateUserDB(idUsuario,body);
  if(updateUsuario.error != null || updateUsuario === null){
    return{
      statusCode: 404,
      body: JSON.stringify({
        message:'Error al borra el usuario '+idUsuario
      }),
      headers:headers
    }
  }
  return{
    statusCode: 200,
    body: JSON.stringify(updateUsuario),
    headers:headers
  }
}

async function disableUsuarioFromCognito(event:any) {
  const cognito = new CognitoIdentityProvider({
    apiVersion: "2016-04-18",
  });
  const USERPOOLID = process.env.USER_POOL_ID;
  const EMAIL = event.pathParameters.email;
  const cognitoParams = {
      UserPoolId: USERPOOLID,
      Username: EMAIL
  };
  await cognito.adminDisableUser(cognitoParams);
}

async function enableUsuarioFromCognito(event:any) {
  const cognito = new CognitoIdentityProvider({
    apiVersion: "2016-04-18",
  });
  const USERPOOLID = process.env.USER_POOL_ID;
  const EMAIL = event.pathParameters.email;
  const cognitoParams = {
      UserPoolId: USERPOOLID,
      Username: EMAIL
  };
  await cognito.adminEnableUser(cognitoParams);
}