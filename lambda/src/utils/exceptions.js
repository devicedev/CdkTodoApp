const exception = (message, defaultMessage, code, statusCode) => {
    const error = new Error(message ? message : defaultMessage);

    error.code = code;

    error.statusCode = statusCode;

    return error;
};

module.exports = {
    TodoValidationException: message =>
        exception(
            message,
            "The validation of the todo failed",
            "TodoValidationException",
            400
        ),
    TodoNotFoundException: message =>
        exception(
            message,
            "The given todo was not found",
            "TodoNotFoundException",
            404
        )
};
