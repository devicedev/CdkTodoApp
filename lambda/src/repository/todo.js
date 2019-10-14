const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const {
    fromDynamoItemToTodoData,
    fromTodoDataToDynamoItem
} = require("./utils/mapper");

const TableName = process.env.TODO_TABLE_NAME;

module.exports = {
    saveTodo,
    retrieveTodo,
    removeTodo,
    retrieveAllTodos
};

async function saveTodo(todoData) {
    try {
        const params = {
            TableName,
            Item: fromTodoDataToDynamoItem(todoData)
        };

        global.logInfo("dynamo.saveTodo", params);

        await dynamo.put(params).promise();
    } catch (err) {
        global.logError("dynamo.saveTodo", err);

        throw err;
    }
}

async function retrieveTodo(id) {
    try {
        const params = {
            TableName,
            Key: {
                id
            }
        };
        global.logInfo("dynamo.retrieveTodo", params);

        const data = await dynamo.get(params).promise();

        return fromDynamoItemToTodoData(data.Item);
    } catch (err) {
        global.logError("dynamo.retrieveTodo", err);
    }
}

async function removeTodo(id) {
    try {
        const params = {
            TableName,
            Key: {
                id
            }
        };

        global.logInfo("dynamo.deleteTodo", params);

        await dynamo.delete(params).promise();
    } catch (err) {
        global.logError("dynamo.deleteTodo", err);
    }
}

async function retrieveAllTodos() {
    try {
        const params = {
            TableName
        };

        global.logInfo("dynamo.retrieveAllTodos", params);

        const items = await dynamo.scan(params).promise();

        return items.Items.map(item => fromDynamoItemToTodoData(item));
    } catch (err) {
        global.logError("dynamo.retrieveAllTodos", err);
    }
}
