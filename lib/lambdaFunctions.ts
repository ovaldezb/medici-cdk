import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class SwLambdaFunctions extends Construct{

  public readonly citasLambda: NodejsFunction;
  public readonly medicosLambda:NodejsFunction;
  public readonly pacientesLambda:NodejsFunction;
  public readonly signosLambda:NodejsFunction;
  public readonly cognitoLambda:NodejsFunction;
  public readonly perfilLambda:NodejsFunction;
  public readonly wahstAppLambda:NodejsFunction;
  public readonly sucursalLambda:NodejsFunction;
  public readonly carnetLambda:NodejsFunction;
  public readonly enfermedadLambda:NodejsFunction;
  public readonly medicamentoLambda:NodejsFunction;
  public readonly disponibilidadLambda:NodejsFunction;
  public readonly preguntasLambda:NodejsFunction;
  public readonly patologiaLambda:NodejsFunction;
  //public readonly recetaLambda:NodejsFunction;
  public readonly pregresAFLambda:NodejsFunction;
  public readonly productoLambda:NodejsFunction;
  public readonly ventaLambda:NodejsFunction;
  public readonly folioLambda:NodejsFunction;
  public readonly facturacionLambda:NodejsFunction;
  public readonly interConsultaLambda:NodejsFunction;

  constructor(scope: Construct, id: string){
    super(scope, id);

    const nodeJSProps: NodejsFunctionProps ={
      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },
      environment: {
        VERSION:'1.0.0',
        ENV:`${process.env.ENV}`,
        MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      },
      runtime: Runtime.NODEJS_18_X
    }


    const nodeJSPropsFarmacia: NodejsFunctionProps ={
      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },
      environment: {
        VERSION:'1.0.0',
        ENV:`${process.env.ENV}`,
        MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_FARMACIA}?retryWrites=true&w=majority`,
      },
      runtime: Runtime.NODEJS_18_X
    }

    const nodeJSPropsFacturacion: NodejsFunctionProps ={
      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },
      environment: {
        VERSION:'1.0.0',
        ENV:`${process.env.ENV}`,
        MONGODB_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_FARMACIA}?retryWrites=true&w=majority`,
        URL_FACTURACION:`${process.env.URL_FACTURACION}`,
        USER_SWSAP:`${process.env.USER_SWSAP}`,
        PASSWORD_SWSAP:`${process.env.PASSWORD_SWSAP}`,
        PDF_SERVICE_URL:`${process.env.PDF_SERVICE_URL}`
      },
      runtime: Runtime.NODEJS_18_X
    }

    const nodeJSPropsNeo4j: NodejsFunctionProps ={
      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },
      environment: {
        NEO4J_URI:`${process.env.NEO4J_URI}`,
        NEO4J_USER:`${process.env.NEO4J_USER}`,
        NEO4J_PASSWORD:`${process.env.NEO4J_PASSWORD}`
      },
      runtime: Runtime.NODEJS_18_X
    }

    this.citasLambda = this.createCitasLambda(nodeJSProps);
    this.medicosLambda = this.createMedicosLambda(nodeJSProps);
    this.pacientesLambda = this.createPacientesLambda(nodeJSProps);
    this.signosLambda = this.createSignosLambda(nodeJSProps);
    this.cognitoLambda = this.createCognitoLambda(nodeJSProps);
    this.perfilLambda = this.createPerfilLambda(nodeJSProps);
    this.wahstAppLambda = this.createWhatsAppLambda(nodeJSProps);
    this.sucursalLambda = this.createSucursalLambda(nodeJSProps);
    this.carnetLambda = this.createCarnetLambda(nodeJSProps);
    this.enfermedadLambda = this.createEnfermedadLambda(nodeJSProps);
    this.medicamentoLambda = this.createMedicamentoLambda(nodeJSProps);
    this.disponibilidadLambda = this.createDisponibilidadLambda(nodeJSProps);
    this.preguntasLambda = this.createPreguntasLambda(nodeJSProps);
    this.patologiaLambda = this.createPatologiaLambda(nodeJSPropsNeo4j);
    //this.preguntaAntFam = this.createPreguntaAntFam(nodeJSProps);
    this.pregresAFLambda = this.createPregresAFLambdaLambda(nodeJSProps);
    this.productoLambda = this.createProductoLambda(nodeJSPropsFarmacia);
    this.ventaLambda = this.createVentatLambda(nodeJSPropsFarmacia);
    this.folioLambda = this.createFolioLambda(nodeJSProps);
    this.facturacionLambda = this.createFacturacionLambda(nodeJSPropsFacturacion);
    this.interConsultaLambda = this.createInterconsultaLambda(nodeJSProps);
  }

  /*private createRecetaLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const recetaFunction = new NodejsFunction(this,'RecetaFunction',{
      functionName:'RecetaFunction',
      entry:join(__dirname,'/../functions/recetaHandler.ts'),
      ...nodeJSProps
    });
    return recetaFunction;
  }*/

  private createPregresAFLambdaLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const preguntasAntFamFunction = new NodejsFunction(this,'PreguntaAntFam',{
      functionName:'PreguntaAntFamFunction',
      entry:join(__dirname,'/../functions/pregresAFHandler.ts'),
      ...nodeJsProps
    } );
    return preguntasAntFamFunction;
  }

  private createPatologiaLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const patologiaFunction = new NodejsFunction(this,'PatologiaFunction',{
      functionName:'PatologiaFunction',
      entry:join(__dirname,'/../functions/patologiaHandler.ts'),
      ...nodeJsProps
    });
    return patologiaFunction;
  }

  private createCitasLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const citasFunction = new NodejsFunction(this, 'CitasFunction', {
      functionName: 'CitasFunction',
      entry: join(__dirname, '/../functions/citasHandler.ts'),
      ...nodeJsProps
    });
    return citasFunction;
  }

  private createMedicosLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const medicosFunction = new NodejsFunction(this, 'MedicosFunction', {
      functionName: 'MedicosFunction',
      entry: join(__dirname, '/../functions/medicoHandler.ts'),
      ...nodeJsProps
    });
    return medicosFunction;
  }

  private createPacientesLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const pacienteFunction = new NodejsFunction(this, 'PacientesFunction', {
      functionName: 'PacientesFunction',
      entry: join(__dirname, '/../functions/pacienteHandler.ts'),
      ...nodeJsProps
    });
    return pacienteFunction;
  }

  private createSignosLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const signosFunction = new NodejsFunction(this, 'SignosFunction', {
      functionName: 'SignosFunction',
      entry: join(__dirname, '/../functions/signosHandler.ts'),
      ...nodeJsProps
    });
    return signosFunction;
  }

  private createCognitoLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const cognitoFunction = new NodejsFunction(this,'CognitoFunction',{
      functionName:'CognitoFunction',
      entry:join(__dirname,'/../functions/cognitoHandler.ts'),
      ...nodeJsProps
    });
    return cognitoFunction;
  }
  
  private createPerfilLambda(nodeJsProps:NodejsFunctionProps):NodejsFunction{
    const perfilFunction = new NodejsFunction(this,'PerfilFunction',{
      functionName:'PerfilFunction',
      entry:join(__dirname,'/../functions/perfilHandler.ts'),
      ...nodeJsProps
    });
    return perfilFunction;
  }

  private createWhatsAppLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const whatsAppFunction = new NodejsFunction(this,'WhatsAppFUnction',{
      functionName:'WhatsAppFunction',
      entry:join(__dirname,'/../functions/whatsAppHandler.ts'),
      ...nodeJSProps
    });
    return whatsAppFunction;
  }

  private createSucursalLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const sucursalFunction = new NodejsFunction(this,'SucursalFUnction',{
      functionName:'SucursalFunction',
      entry:join(__dirname,'/../functions/sucursalHandler.ts'),
      ...nodeJSProps
    });
    return sucursalFunction;
  }

  private createCarnetLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const carnetLambda = new NodejsFunction(this, 'CarnetLambda',{
      functionName:'CarnetLambda',
      entry:join(__dirname,'/../functions/carnetHandler.ts'),
      ...nodeJSProps
    });
    return carnetLambda;
  }

  private createEnfermedadLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const enfermedadLambda = new NodejsFunction(this,'EnfermedadLambda',{
      functionName:'EnfermedadLambda',
      entry:join(__dirname,'/../functions/enfermedadHandler.ts'),
      ...nodeJSProps
    });
    return enfermedadLambda;
  }

  private createMedicamentoLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const medicamentoLambda = new NodejsFunction(this,'MedicamentoLambda',{
      functionName: 'MedicamentoLmabda',
      entry:join(__dirname,'/../functions/medicamentoHandler.ts'),
      ...nodeJSProps
    });
    return medicamentoLambda;
  }

  private createDisponibilidadLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const disponibilidadLambda = new NodejsFunction(this,'DisponibilidadLambda',{
      functionName:'DisponibilidadLambda',
      entry:join(__dirname,'/../functions/disponibHandler.ts'),
      ...nodeJSProps
    });
    return disponibilidadLambda;
  }

  private createPreguntasLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const preguntasLambda = new NodejsFunction(this,'PreguntasLambda',{
      functionName:'PreguntasLambda',
      entry:join(__dirname,'/../functions/preguntasHandler.ts'),
      ...nodeJSProps
    });
    return preguntasLambda;
  }

  private createProductoLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const productoLambda = new NodejsFunction(this,'ProductoLambda',{
      functionName:'ProductoLambda',
      entry:join(__dirname,'/../functions/productoHandler.ts'),
      ...nodeJSProps
    });
    return productoLambda;
  }

  private createVentatLambda(nodeJSProps:NodejsFunctionProps):NodejsFunction{
    const ventaLambda = new NodejsFunction(this,'VentaLambda',{
      functionName:'VentaLambda',
      entry:join(__dirname,'/../functions/ventasHandler.ts'),
      ...nodeJSProps
    });
    return ventaLambda;
  }

  private createFolioLambda(nodeJSProps:NodejsFunctionProps){
    const folioLambda = new NodejsFunction(this,'FolioLambda',{
      functionName:'FolioLambda',
      entry:join(__dirname,'/../functions/folioHandler.ts'),
      ...nodeJSProps
    });
    return folioLambda;
  }

  private createFacturacionLambda(nodeJSProps:NodejsFunctionProps){
    const facturacionLambda = new NodejsFunction(this,'FacturacionLambda',{
      functionName:'FacturacionLambda',
      entry:join(__dirname,'/../functions/facturacionHandler.ts'),
      ...nodeJSProps
    });
    return facturacionLambda;
  }

  private createInterconsultaLambda(nodeJSProps:NodejsFunctionProps){
    const interconsultasLambda = new NodejsFunction(this,'InterconsultaLambda',{
      functionName:'InterconsultaLambda',
      entry:join(__dirname,'/../functions/interconsultaHandler.ts'),
      ...nodeJSProps
    });
    return interconsultasLambda;
  }
}