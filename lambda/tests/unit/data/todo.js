const faker = require("faker");
const uuidv4 = require("uuid/v4");

module.exports = {
    makeTestCreateTodoData,
    makeTestUpdateTodoData
};

function makeTestCreateTodoData() {
    return Object.freeze({
        title: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        isCompleted: faker.random.boolean()
    });
}

function makeTestUpdateTodoData() {
    return Object.freeze({
        id: uuidv4(),
        updateFields: {
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            isCompleted: faker.random.boolean()
        }
    });
}
