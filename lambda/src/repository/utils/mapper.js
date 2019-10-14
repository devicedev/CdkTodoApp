const { TodoData } = require("../../entities/todo/data");

module.exports = {
    fromDynamoItemToTodoData,
    fromTodoDataToDynamoItem
};

function fromDynamoItemToTodoData(dynamoItem) {
    if (!dynamoItem) return undefined;
    return TodoData(dynamoItem);
}
function fromTodoDataToDynamoItem(todoData) {
    const dynamoItem = {};

    Object.keys(todoData).forEach(key => {
        if (todoData[key] !== "") {
            dynamoItem[key] = todoData[key];
        }
    });
    return dynamoItem
}
