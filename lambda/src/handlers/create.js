require("../utils/logger");

const {
    todo: { createTodo }
} = require("../usecases");

const {
    todo: { saveTodo }
} = require("../repository");

const {
    createSuccessResponse,
    createFailureResponse
} = require("../utils/responses");

module.exports.handler = async event => {
    global.logInfo("todo.create ", event);

    try {
        const body = JSON.parse(event.body);

        const todoData = await createTodo({ saveTodo })(body);

        return createSuccessResponse(todoData);

    } catch (err) {
        return createFailureResponse(err);
    }
};
