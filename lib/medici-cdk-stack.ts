import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SwCognito } from './cognito';
import { SwLambdaFunctions } from './lambdaFunctions';
import { SwApiGateway } from './apiGateway';
import { SwUsuarioLambdaFunction } from './usuarioLambdaFunction';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MediciCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);    
    const lambdaFunctions = new SwLambdaFunctions(this,'LambdaFUnctions');
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
    
    new SwApiGateway(this,'ApiGW',{
      citasLambda:    lambdaFunctions.citasLambda,
      medicosLambda:  lambdaFunctions.medicosLambda,
      pacientesLambda:lambdaFunctions.pacientesLambda,
      signosLambda:   lambdaFunctions.signosLambda,
      perfilLambda: lambdaFunctions.perfilLambda,
      usuarioLambda: usuarioLambda.usuariosLambda
      },
      cognitoPool.clinicaUserPool
      );
  }
}
