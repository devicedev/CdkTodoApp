const Joi = require("@hapi/joi");

const uuidv4 = require("uuid/v4");

const { TodoValidationException } = require("../../utils/exceptions");

const { TodoData } = require("./data");

module.exports = {
    create
};

function create(data) {
    if (!data) throw TodoValidationException();

    const { error } = validate();

    if (error) throw TodoValidationException(error.message);

    const todo = {
        id: uuidv4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...data
    };

    return TodoData(todo);

    function validate() {
        const schema = makeValidationSchema();

        return schema.validate(data);

        function makeValidationSchema() {
            return Joi.object().keys({
                title: Joi.string()
                    .min(1)
                    .max(255)
                    .required(),
                description: Joi.string()
                    .min(1)
                    .max(65500)
                    .required(),
                isCompleted: Joi.boolean().required()
            });
        }
    }
}
