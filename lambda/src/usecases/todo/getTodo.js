const { TodoNotFoundException } = require("../../utils/exceptions");

module.exports = ({retrieveTodo}) => async (input) => {
  const todo = await retrieveTodo(input.id);

  if(!todo)
      throw TodoNotFoundException();

  return todo;
};