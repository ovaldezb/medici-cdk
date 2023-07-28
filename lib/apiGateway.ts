import { LambdaRestApi, CognitoUserPoolsAuthorizer, Resource, LambdaIntegration, AuthorizationType, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as cognito from 'aws-cdk-lib/aws-cognito';


interface SwApiGatewaysProps{
  citasLambda: IFunction,
  medicosLambda: IFunction,
  pacientesLambda:IFunction,
  signosLambda: IFunction,
  perfilLambda: IFunction,
  usuarioLambda: IFunction,
  whatsAppLambda: IFunction,
  sucursalLambda: IFunction,
  carnetLambda: IFunction,
  enfermedadLambda: IFunction
}

export class SwApiGateway extends Construct{

  private _clinicaCognito:cognito.UserPool;
  constructor(scope: Construct, id: string, props:SwApiGatewaysProps, clinicaCognito: cognito.UserPool){
    super(scope,id);
    this._clinicaCognito = clinicaCognito;
    this.createApigCitas(props.citasLambda);
    this.createApigMedicos(props.medicosLambda);
    this.createApigPaciente(props.pacientesLambda);
    this.createApigSignos(props.signosLambda);
    this.createApigPerfil(props.perfilLambda);
    this.createApigUsuario(props.usuarioLambda);
    this.createApigWhatsApp(props.whatsAppLambda);
    this.createApigSucursal(props.sucursalLambda);
    this.createApigCarnet(props.carnetLambda);
    this.createApigEnfermedad(props.enfermedadLambda);
  }

  private createApigCitas(citasLambda:IFunction){
    const apiGwCitas = new RestApi(this, 'CitasApiGw', {
      restApiName: 'Citas Service',
      //handler: citasLambda,
      //proxy: false,
      deployOptions: {
        stageName: 'dev'
      },
      /*defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key'
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }*/
    });

    const authorizer = new CognitoUserPoolsAuthorizer(this,'CitasAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });

    const citas = apiGwCitas.root.addResource('cita');
    citas.addCorsPreflight({
      allowOrigins:['*'],
      allowMethods:['POST']
    });
    citas.addMethod('POST',new LambdaIntegration(citasLambda),{
      authorizer: authorizer
    });
    const getCitaByFecha = citas.addResource('{parametro}');
    getCitaByFecha.addCorsPreflight({
      allowOrigins:['*'],
      allowMethods:['GET','PUT','DELETE']
    });
    getCitaByFecha.addMethod('GET',new LambdaIntegration(citasLambda),{
      authorizer: authorizer
    });
    getCitaByFecha.addMethod('PUT',new LambdaIntegration(citasLambda),{
      authorizer: authorizer
    });
    getCitaByFecha.addMethod('DELETE',new LambdaIntegration(citasLambda),{
      authorizer: authorizer
    });

    const getCitaByFechaAndMedico = getCitaByFecha.addResource('{idMedico}');
    getCitaByFechaAndMedico.addCorsPreflight({
      allowOrigins:['*'],
      allowMethods:['GET']
    });
    getCitaByFechaAndMedico.addMethod('GET',new LambdaIntegration(citasLambda),{
      authorizer: authorizer
    });
  }

  private createApigMedicos(medicosLambda:IFunction){
    const apiGwMedico = new RestApi(this, 'MedicoApiGw', {
      restApiName: 'Medico Service',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });

    const authorizer = new CognitoUserPoolsAuthorizer(this,'MedicoAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });

    const medico = apiGwMedico.root.addResource('medico');
    medico.addMethod('GET',new LambdaIntegration(medicosLambda),{authorizer:authorizer});
    const actionMedicoById = medico.addResource('{email}');
    actionMedicoById.addMethod('GET',new LambdaIntegration(medicosLambda),{authorizer:authorizer});
  }

  private createApigPaciente(pacienteLambda:IFunction){
    const apiGwPaciente = new RestApi(this, 'PacienteApiGw', {
      restApiName: 'Paciente Service',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    const authorizer = new CognitoUserPoolsAuthorizer(this,'PacientesAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });
    const paciente = apiGwPaciente.root.addResource('paciente');
    paciente.addMethod('POST',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    paciente.addMethod('GET',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    const pacienteNombre = paciente.addResource('nombre').addResource('{nombre}');
    pacienteNombre.addMethod('GET',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    const pacienteApellido = paciente.addResource('apellido').addResource('{apellido}');
    pacienteApellido.addMethod('GET',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    const pacienteTelefono = paciente.addResource('telefono').addResource('{telefono}');
    pacienteTelefono.addMethod('GET',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    const pacienteById = paciente.addResource('{idPaciente}');
    pacienteById.addMethod('PUT',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    pacienteById.addMethod('DELETE',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
    pacienteById.addMethod('GET',new LambdaIntegration(pacienteLambda),{authorizer:authorizer});
  }

  private createApigSignos(signosLambda:IFunction){
    const apiGwSignos = new RestApi(this, 'SignosApiGw', {
      restApiName: 'Signos Service',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    
    const authorizer = new CognitoUserPoolsAuthorizer(this,'SignosAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });

    const signos = apiGwSignos.root.addResource('signos');
    signos.addMethod('POST',new LambdaIntegration(signosLambda),{authorizer:authorizer});
    const signosById = signos.addResource('{parametro}'); //en el put is el idSigno, en el get es idPaciente
    signosById.addMethod('PUT',new LambdaIntegration(signosLambda),{authorizer:authorizer});
    signosById.addMethod('GET',new LambdaIntegration(signosLambda),{authorizer:authorizer});
    //const signosByPaciente = signos.addResource('paciente').addResource('{idPaciente}')
    //signosByPaciente.addMethod('GET')
  }

  private createApigPerfil(perfilLambda:IFunction){
    const apiGwPerfil = new LambdaRestApi(this, 'PerfilApiGw', {
      restApiName: 'Perfil Service',
      handler: perfilLambda,
      proxy: false,
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    /*const authorizer = new CognitoUserPoolsAuthorizer(this,'PerfilAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });*/
    
    const perfil = apiGwPerfil.root.addResource('perfil');
    //perfil.addMethod('GET',new LambdaIntegration(perfilLambda),{authorizer:authorizer});
    perfil.addMethod('GET');
    //perfil.addMethod('POST',new LambdaIntegration(perfilLambda),{authorizer:authorizer});
    perfil.addMethod('POST');
    const perfilById = perfil.addResource('{idPerfil}');
    //perfilById.addMethod('PUT',new LambdaIntegration(perfilLambda),{authorizer:authorizer});
    //perfilById.addMethod('DELETE',new LambdaIntegration(perfilLambda),{authorizer:authorizer});
    perfilById.addMethod('PUT');
    perfilById.addMethod('DELETE');
  }

  private createApigUsuario(usuarioLambda:IFunction){
    const apiGwPerfil = new RestApi(this, 'UsuarioApiGw', {
      restApiName: 'Usuario Service',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    const authorizer = new CognitoUserPoolsAuthorizer(this,'UsuarioAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });
    const usuario = apiGwPerfil.root.addResource('usuario');
    usuario.addMethod('GET',new LambdaIntegration(usuarioLambda),{authorizer:authorizer});
    const perfilById = usuario.addResource('{idUsuario}').addResource('{email}').addResource('{isDisabled}');
    perfilById.addMethod('PUT',new LambdaIntegration(usuarioLambda),{authorizer:authorizer});
  }

  private createApigWhatsApp(whatsAppLambda:IFunction){
    const apigWhatsApp = new LambdaRestApi(this,'WhatsAppApiG',{
      restApiName:'WhatsAppLambda',
      handler: whatsAppLambda,
      proxy: false,
      deployOptions: {
        stageName: 'dev'
      },
    });
    const endpoint = apigWhatsApp.root.addResource('webhook');
    endpoint.addMethod('POST');
    endpoint.addMethod('GET');
  }

  private createApigSucursal(sucursalLambda:IFunction){
    const apiGwPerfil = new RestApi(this, 'SucursalApiGw', {
      restApiName: 'SucursalService',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    const authorizer = new CognitoUserPoolsAuthorizer(this,'SucursalAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });
    const sucursal = apiGwPerfil.root.addResource('sucursal');
    sucursal.addMethod('GET',new LambdaIntegration(sucursalLambda),{authorizer:authorizer});
    sucursal.addMethod('POST',new LambdaIntegration(sucursalLambda),{authorizer:authorizer});
    const sucursalById = sucursal.addResource('{idSucursal}');
    sucursalById.addMethod('PUT',new LambdaIntegration(sucursalLambda),{authorizer:authorizer});
    sucursalById.addMethod('DELETE',new LambdaIntegration(sucursalLambda),{authorizer:authorizer});
  }

  private createApigCarnet(carnetLambda:IFunction){
    const apiGwPerfil = new RestApi(this, 'CarnetApiGw', {
      restApiName: 'CarnetlService',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    const authorizer = new CognitoUserPoolsAuthorizer(this,'CarnetAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });
    const carnet = apiGwPerfil.root.addResource('carnet');
    carnet.addMethod('GET',new LambdaIntegration(carnetLambda),{authorizer:authorizer});
    carnet.addMethod('POST',new LambdaIntegration(carnetLambda),{authorizer:authorizer});
    const carnetById = carnet.addResource('{carnetId}');
    carnetById.addMethod('GET',new LambdaIntegration(carnetLambda),{authorizer:authorizer});
    carnetById.addMethod('PUT', new LambdaIntegration(carnetLambda),{authorizer:authorizer});
  }

  private createApigEnfermedad(enfermedadLambda:IFunction){
    const apiGwEnfermedad = new RestApi(this, 'EnfermedadApiGw', {
      restApiName: 'EnfermedadService',
      deployOptions: {
        stageName: 'dev'
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET'],
        allowCredentials: true,
        allowOrigins: ['*'],
      }
    });
    const authorizer = new CognitoUserPoolsAuthorizer(this,'EnfermedadAuthorizer',{
      cognitoUserPools:[this._clinicaCognito]
    });
    const enfermedad = apiGwEnfermedad.root.addResource('enfermedad');
    const enfermedadBySintomas = enfermedad.addResource('{sintomas}');
    enfermedadBySintomas.addMethod('GET',new LambdaIntegration(enfermedadLambda),{authorizer:authorizer});
  }
}