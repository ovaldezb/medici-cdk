import neo4j from 'neo4j-driver';
const headers ={
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Credentials' : true,
  'Content-Type': 'application/json'
};

  const URI = process.env.NEO4J_URI as string;
  const USER = process.env.NEO4J_USER || '';
  const PASSWORD:string = process.env.NEO4J_PASSWORD!;
  let driver

export const handler = async function(event:any) {
  const method = event.requestContext.httpMethod;
  switch(method){
    case 'GET':
      return getPatologiasBySintoma('dolor');
    default:
      throw new Error('Unsupported route ');
  }
  
}

async function getPatologiasBySintoma(sintoma:string) {
  driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD));
      try{
        
        let {records} = await driver.executeQuery(
          //'MATCH p=()-[:PRESENTA]->() RETURN p LIMIT 30;',
          'MATCH(n:Patologia)-[r:PRESENTA]->(s:Sintoma) Where s.name=$sintoma RETURN n;',
          {sintoma:sintoma},
          {database:'neo4j'}
        );
        await driver.close();
        return {
          statusCode:200,
          body:JSON.stringify(records),
          headers:headers
        }
      }catch(err:any){
        return {
          statusCode:400,
          body: JSON.stringify({
            message:'Error al traer las patologias'
          }),
          headers:headers
        }
      }
}