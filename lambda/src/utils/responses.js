module.exports = {
    createSuccessResponse,
    createFailureResponse
};
function createSuccessResponse(data) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            success: true,
            error: null,
            data
        })
    };
}
function createFailureResponse(err) {
    return {
        statusCode: err.statusCode,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            success: false,
            error: {
                message: err.message,
                code: err.code
            },
            data: null
        })
    };
}
