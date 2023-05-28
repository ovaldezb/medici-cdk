const database = require('./service/cognitoDB');
const db = database(process.env.MONGODB_URI);

export const handler = async function(event:any) {
  const params = event.request;
  console.log('Params',params);
  const user = await db.saveNewUser(params.userAttributes);
  console.log('Usuario:',user);
  //saveUsuario(params);
  return event;
}

/*async function saveUsuario(params:any){
  console.log('Entrando a guardar usuarios');
  const user = await db.saveNewUser(params.userAttributes);
  console.log(user);
}*/