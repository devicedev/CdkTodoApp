const {
    todo: { createTodo, getTodo, getAllTodos, updateTodo, deleteTodo }
} = require("../../../src/usecases");

const { makeTestCreateTodoData } = require("../data/todo");

describe("=== Todo Usecases ===", () => {
    describe("create", () => {
        it("should create a valid todo", async () => {
            const dependencies = makeDependencies();

            const creationTodoData = makeTestCreateTodoData();

            const todoData = await createTodo({ ...dependencies })(
                creationTodoData
            );

            expect(todoData).toBeTruthy();

            function makeDependencies() {
                return {
                    saveTodo: async () => Promise.resolve()
                };
            }
        });
        it("should call dependencies correctly", async () => {
            const dependencies = makeDependencies();

            const creationTodoData = makeTestCreateTodoData();

            await createTodo({ ...dependencies })(creationTodoData);

            expect(dependencies.saveTodoCalled).toBe(true);

            function makeDependencies() {
                const dependencies = {
                    saveTodoCalled: false,
                    saveTodo: async () => {
                        dependencies.saveTodoCalled = true;
                        return Promise.resolve();
                    }
                };
                return dependencies;
            }
        });
    });
});
