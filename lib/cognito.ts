import { Construct } from "constructs";
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RemovalPolicy } from "aws-cdk-lib";

export class SwCognito extends Construct{

  public clinicaUserPool:cognito.UserPool;

  constructor(scope: Construct, id: string, cognitoLambda:NodejsFunction){
    super(scope,id);
   
    this.clinicaUserPool = new cognito.UserPool(this,'UserPool',{
      userPoolName: 'clinicaUserPool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true
      },
      autoVerify:{
        email: true
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        middleName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
        gender:{
          required:true,
          mutable: true
        },
        phoneNumber:{
          required: true,
          mutable: true
        },
        birthdate:{
          required: true,
          mutable: true
        },
      },
      customAttributes: {
        perfil: new cognito.StringAttribute({mutable: true}),
        cedula: new cognito.StringAttribute({mutable: true}),
        especialidad: new cognito.StringAttribute({mutable: true}),
        isAdmin: new cognito.StringAttribute({mutable: true}),
        rfc : new cognito.StringAttribute({mutable: true}),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.clinicaUserPool.addClient('Medici App',{
      supportedIdentityProviders:[]
    })

    new cognito.CfnUserPoolGroup(this,'Medico Group',{
      groupName:'MEDICO',
      userPoolId:this.clinicaUserPool.userPoolId
    });

    new cognito.CfnUserPoolGroup(this,'Enfermera Group',{
      groupName:'ENFERMERA',
      userPoolId:this.clinicaUserPool.userPoolId
    });

    new cognito.CfnUserPoolGroup(this,'Recepcion Group',{
      groupName:'RECEPCION',
      userPoolId:this.clinicaUserPool.userPoolId
    });

    new cognito.CfnUserPoolGroup(this,'Administración Group',{
      groupName:'ADMINISTRADOR',
      userPoolId:this.clinicaUserPool.userPoolId
    });

    this.clinicaUserPool.addTrigger(cognito.UserPoolOperation.POST_CONFIRMATION,cognitoLambda);
  }
}