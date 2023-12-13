const database = require('./service/medicamentoDB');
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
    case 'GET' :
      if(event.pathParameters != null){
        return findMedicamentoByNombre(event.pathParameters.nombre);
      }
    case 'POST' :
      return saveMedicamento(event);
    default:
      throw new Error('Unsupported route '+method);
  }
}

async function findMedicamentoByNombre(nombre:string) {
  const medicamentos = await db.getMedicByNombre(nombre);
  if(medicamentos === null || medicamentos.err != null){
    return {
      statusCode:404,
      body: JSON.stringify({
        message:'No se encontró medicamento con ese nombre'
      })
    }
  }
  return {
    statusCode:200,
    body: JSON.stringify(medicamentos),
    headers:headers
  }
}

async function saveMedicamento(event:any) {
  const medicamento = JSON.parse(event.body);
  const medicamentoSaved = await db.save(medicamento);
  if(medicamentoSaved === null || medicamentoSaved.err != null){
    return{
      statusCode: 404,
      body:JSON.stringify({
        message:'No se pudo guardar el medicamento '+medicamentoSaved.err
      })
    }
  }
  return {
    statusCode: 200,
    body:JSON.stringify(medicamentoSaved),
    headers:headers
  }
}