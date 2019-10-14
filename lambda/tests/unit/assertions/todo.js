module.exports = {
    assertValidCreateTodoData,
    assertValidUpdateTodoData
};

const {
    assertId,
    assertField,
    assertDate
} = require("../../utils/assertions");

function assertValidCreateTodoData(creationTodoData, todoData) {
    expect(todoData).toBeTruthy();

    expect(creationTodoData).toBeTruthy();

    assertId(todoData.id);

    assertField(todoData.title, creationTodoData.title);

    assertField(todoData.description, creationTodoData.description);

    expect(todoData.isCompleted).toBe(creationTodoData.isCompleted);

    assertDate(todoData.createdAt, creationTodoData.createdAt);

    assertDate(todoData.updatedAt, creationTodoData.updatedAt);
}

function assertValidUpdateTodoData(updateTodoData, todoData) {
    expect(todoData).toBeTruthy();

    expect(updateTodoData).toBeTruthy();

    assertField(todoData.title, updateTodoData.title);

    assertField(todoData.description, updateTodoData.description);

    expect(todoData.isCompleted).toBe(updateTodoData.isCompleted);
}