import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SwCognito } from './cognito';
import { SwLambdaFunctions } from './lambdaFunctions';
import { SwApiGateway } from './apiGateway';
import { SwUsuarioLambdaFunction } from './usuarioLambdaFunction';

export class MediciCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);    
    const lambdaFunctions = new SwLambdaFunctions(this,'LambdaFunctions');
    const cognitoPool = new SwCognito(this,'ClinicaCognitoPool',lambdaFunctions.cognitoLambda);
    
    const cognitoAddUserPolicy = new iam.PolicyStatement({
      effect:iam.Effect.ALLOW,
      actions:['cognito-idp:AdminAddUserToGroup'],
      resources:[cognitoPool.clinicaUserPool.userPoolArn],
    });
    
    lambdaFunctions.cognitoLambda.role?.attachInlinePolicy(new iam.Policy(this,'CognitoAddUserToGroup',{
      statements:[cognitoAddUserPolicy]
    }));

    const usuarioLambda = new SwUsuarioLambdaFunction(this,'UsuarioLambdaFnction',cognitoPool.clinicaUserPool.userPoolId);

    const usuarioDisableUserPolicy = new iam.PolicyStatement({
      effect:iam.Effect.ALLOW,
      actions:['cognito-idp:AdminDisableUser','cognito-idp:AdminEnableUser'],
      resources:[cognitoPool.clinicaUserPool.userPoolArn],
    });
    
    usuarioLambda.usuariosLambda.role?.attachInlinePolicy(new iam.Policy(this,'UsuarioCognitoDisableUser',{
      statements:[usuarioDisableUserPolicy]
    }));
    
    new SwApiGateway(this,'ApiGW',{
        citasLambda:    lambdaFunctions.citasLambda,
        medicosLambda:  lambdaFunctions.medicosLambda,
        pacientesLambda:lambdaFunctions.pacientesLambda,
        signosLambda:   lambdaFunctions.signosLambda,
        perfilLambda: lambdaFunctions.perfilLambda,
        usuarioLambda: usuarioLambda.usuariosLambda,
        whatsAppLambda: lambdaFunctions.wahstAppLambda,
        sucursalLambda: lambdaFunctions.sucursalLambda,
        carnetLambda: lambdaFunctions.carnetLambda,
        enfermedadLambda: lambdaFunctions.enfermedadLambda,
        medicamentoLambda: lambdaFunctions.medicamentoLambda,
        disponibilidadLambda: lambdaFunctions.disponibilidadLambda,
        preguntasLambda: lambdaFunctions.preguntasLambda,
        patologiaLambda: lambdaFunctions.patologiaLambda,
        pregresAFLambda: lambdaFunctions.pregresAFLambda,
        productoLambda: lambdaFunctions.productoLambda,
        ventaLambda: lambdaFunctions.ventaLambda,
        folioLambda: lambdaFunctions.folioLambda,
        facturacionLambda:lambdaFunctions.facturacionLambda
      },
      cognitoPool.clinicaUserPool
    );
  }
}
