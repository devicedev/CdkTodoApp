require("../utils/logger");

const {
    todo: { getAllTodos }
} = require("../usecases");

const {
    todo: { retrieveAllTodos }
} = require("../repository");

const {
    createSuccessResponse,
    createFailureResponse
} = require("../utils/responses");

module.exports.handler = async event => {
    global.logInfo("todo.getAll", event);

    try {
        const todos = await getAllTodos({ retrieveAllTodos })();

        return createSuccessResponse(todos);
    } catch (err) {
        return createFailureResponse(err);
    }
};
