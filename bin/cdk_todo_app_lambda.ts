#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkTodoAppLambdaStack } from '../lib/cdk_todo_app_lambda-stack';

const app = new cdk.App();
new CdkTodoAppLambdaStack(app, 'CdkTodoAppLambdaStack');
