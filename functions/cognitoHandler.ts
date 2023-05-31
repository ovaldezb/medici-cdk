const database = require('./service/cognitoDB');
const db = database(process.env.MONGODB_URI);
const AWS = require('aws-sdk');

export const handler = async function(event:any) {
  const params = event.request;
  await db.saveNewUser(params.userAttributes); 
  const userPoolId = event.userPoolId; 
  const userName = event.userName;
  const paramsGroup = {
    GroupName: params.userAttributes['custom:perfil'],
    UserPoolId: userPoolId,
    Username: userName,
  };
  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  await cognitoIdp.adminAddUserToGroup(paramsGroup).promise();
  return event; 
}