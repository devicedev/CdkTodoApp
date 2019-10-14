const {
    factory: { create },
    behavior: { update }
} = require("../../../src/entities/todo");

const {
    todo: { assertValidCreateTodoData, assertValidUpdateTodoData }
} = require("../assertions");

const { assertError } = require("../../utils/assertions");
const {
    todo: { makeTestCreateTodoData, makeTestUpdateTodoData }
} = require("../data");

describe("=== Todo Entity ===", () => {
    describe("factory", () => {
        describe("create", () => {
            it("should create valid todo data", () => {
                const creationTodoData = makeTestCreateTodoData();

                const todoData = create(creationTodoData);

                assertValidCreateTodoData(creationTodoData, todoData);
            });
            it("should throw an error if the todo fields are not valid", () => {
                try {
                    const creationTodoData = {};

                    create(creationTodoData);

                    throw new Error("Should have thrown an error");
                } catch (err) {
                    assertError(err, "TodoValidationException");
                }
            });
        });
    });
    describe("behaviour", () => {
        describe("update", () => {
            it("should update the todo", () => {
                const createTodoData = {};

                const updateTodoData = makeTestUpdateTodoData();

                const todoData = update(createTodoData,updateTodoData.updateFields);

                assertValidUpdateTodoData(updateTodoData.updateFields, todoData);
            });
            it("should throw an error if the update todo fields are not valid", () => {
                const createTodoData = {};

                const updateTodoData = {};

                try {
                    update(createTodoData, updateTodoData.updateFields);

                    throw new Error("Should have thrown an error");
                } catch (err) {
                    assertError(err, "TodoValidationException");
                }
            });
        });
    });
});
