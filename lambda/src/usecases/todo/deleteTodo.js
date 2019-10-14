const { TodoNotFoundException } = require("../../utils/exceptions");

module.exports = ({retrieveTodo, removeTodo}) => async (input) => {
    const todo = await retrieveTodo(input.id);

    if(!todo)
        throw TodoNotFoundException();

    await removeTodo(input.id);

};