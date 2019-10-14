require("../utils/logger");

const {
    todo: { getTodo }
} = require("../usecases");

const {
    todo: { retrieveTodo }
} = require("../repository");

const {
    createSuccessResponse,
    createFailureResponse
} = require("../utils/responses");

module.exports.handler = async event => {
    global.logInfo("todo.get", JSON.stringify(event));

    try {
        const parameters = event.pathParameters;

        const todo = await getTodo({ retrieveTodo })(parameters);

        return createSuccessResponse(todo);
    } catch (err) {
        return createFailureResponse(err);
    }
};
