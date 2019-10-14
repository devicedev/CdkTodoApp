const {
    factory: { create }
} = require("../../entities/todo/index");

module.exports = ({ saveTodo }) => async input => {
    const todoData = create(input);

    await saveTodo(todoData);

    return todoData;
};
