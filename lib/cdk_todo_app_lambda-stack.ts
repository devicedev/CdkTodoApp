import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import apigateway = require("@aws-cdk/aws-apigateway");
import dynamodb = require("@aws-cdk/aws-dynamodb");
import appsync = require("@aws-cdk/aws-appsync");

export class CdkTodoAppLambdaStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const table = new dynamodb.Table(this, "TodoTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
        });

        const createHandler = new lambda.Function(this, "CreateHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("lambda"),
            handler: "src/handlers/create.handler",
            environment: {
                TODO_TABLE_NAME: table.tableName
            }
        });
        table.grantWriteData(createHandler);

        const updateHandler = new lambda.Function(this, "UpdateHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("lambda"),
            handler: "src/handlers/update.handler",
            environment: {
                TODO_TABLE_NAME: table.tableName
            }
        });
        table.grantReadWriteData(updateHandler);

        const deleteHandler = new lambda.Function(this, "DeleteHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("lambda"),
            handler: "src/handlers/delete.handler",
            environment: {
                TODO_TABLE_NAME: table.tableName
            }
        });
        table.grantReadWriteData(deleteHandler);

        const getHandler = new lambda.Function(this, "GetHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("lambda"),
            handler: "src/handlers/get.handler",
            environment: {
                TODO_TABLE_NAME: table.tableName
            }
        });
        table.grantReadData(getHandler);

        const getAllHandler = new lambda.Function(this, "GetAllHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("lambda"),
            handler: "src/handlers/getAll.handler",
            environment: {
                TODO_TABLE_NAME: table.tableName
            }
        });
        table.grantReadData(getAllHandler);

        const api = new apigateway.LambdaRestApi(this, "todo-api", {
            handler: getAllHandler,
            proxy: false
        });

        const todoResource = api.root.addResource("todo");

        const createTodo = new apigateway.LambdaIntegration(createHandler);

        todoResource.addMethod("POST", createTodo);

        const updateTodo = new apigateway.LambdaIntegration(updateHandler);

        todoResource.addMethod("PUT", updateTodo);

        const deleteTodo = new apigateway.LambdaIntegration(deleteHandler);

        todoResource.addMethod("DELETE", deleteTodo);

        const getTodo = new apigateway.LambdaIntegration(getHandler);

        todoResource.addMethod("GET", getTodo);

        const todoResources = api.root.addResource("todos");

        const getAllTodos = new apigateway.LambdaIntegration(getAllHandler);

        todoResources.addMethod("GET", getAllTodos);

        const graphQLApi = new appsync.CfnGraphQLApi(this, "GraphQLApi", {
            name: "todo-data-gateway-graphqlapi-dev",
            authenticationType: "API_KEY"
        });
        const graphQLSchema = new appsync.CfnGraphQLSchema(
            this,
            "GraphQlSchema",
            {
                apiId: graphQLApi.attrApiId,
                definition: `
                type Query {
                  getTodos: TodoOutput!
                  getTodo: TodosOutput!
                }

                type Mutation {
                  createTodo(input: CreateTodoInput!): TodoOutput!
                  updateTodo(input: UpdateTodoInput!): TodoOutput!
                  deleteTodo(input: DeleteTodoInput!): TodoOutput!
                }
        
                input CreateTodoInput {
                  title: String!
                  description: String!
                  isCompleted: Boolean!
                }
        
                input UpdateTodoInput {
                  id: ID!
                  updateFields: TodoUpdate!
                }
        
                input TodoUpdate {
                  title: String
                  description: String
                  isCompleted: Boolean
                }
        
                input DeleteTodoInput {
                  id: ID!
                }
        
                type TodoOutput {
                  success: Boolean!
                  error: Error
                  data: Todo
                }
        
                type TodosOutput {
                  success: Boolean!
                  error: Error
                  data: [Todo]
                }
        
                type Todo {
                  id: ID!
                  title: String!
                  description: String!
                  isCompleted: Boolean!
                  createdAt: String!
                  updatedAt: String!
                }
        
                type Error {
                  code: String,
                  message: String
                }
            `
            }
        );
    }
}
