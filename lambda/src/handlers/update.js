require("../utils/logger");

const {
    createSuccessResponse,
    createFailureResponse
} = require("../utils/responses");

const {
    todo: { updateTodo }
} = require("../usecases");

const {
    todo: { retrieveTodo, saveTodo }
} = require("../repository");

module.exports.handler = async event => {
    global.logInfo("todo.update", event);

    try {
        const body = JSON.parse(event.body);

        const todo = await updateTodo({ retrieveTodo, saveTodo })(body);

        return createSuccessResponse(todo);
    } catch (err) {
        return createFailureResponse(err);
    }
};
