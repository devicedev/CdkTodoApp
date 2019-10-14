require("../utils/logger");

const {
    todo: { deleteTodo }
} = require("../usecases");

const {
    todo: { retrieveTodo, removeTodo }
} = require("../repository");

const {
    createSuccessResponse,
    createFailureResponse
} = require("../utils/responses");

module.exports.handler = async event => {
    global.logInfo("todo.delete", event);

    try {
        const body = JSON.parse(event.body);

        await deleteTodo({ retrieveTodo, removeTodo })(body);

        return createSuccessResponse();
    } catch (err) {
        return createFailureResponse(err);
    }
};
