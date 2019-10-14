module.exports = { TodoData };

function TodoData({
    id,
    title,
    description,
    isCompleted,
    createdAt,
    updatedAt
}) {
    return Object.freeze({
        id,
        title,
        description,
        isCompleted,
        createdAt,
        updatedAt
    });
}
