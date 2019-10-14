const { TodoNotFoundException } = require("../../utils/exceptions");

const {
    behavior: { update }
} = require("../../entities/todo");

module.exports = ({ retrieveTodo, saveTodo }) => async input => {
    let todo = await retrieveTodo(input.id);

    if (!todo) throw TodoNotFoundException();

    todo = update(todo, input.updateFields);

    await saveTodo(todo);

    return todo;
};
