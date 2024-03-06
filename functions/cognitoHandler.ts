const database = require('./service/cognitoDB');
const db = database(process.env.MONGODB_URI);
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

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
  const cognitoIdp = new CognitoIdentityProvider();
  await cognitoIdp.adminAddUserToGroup(paramsGroup);
  return event; 
}