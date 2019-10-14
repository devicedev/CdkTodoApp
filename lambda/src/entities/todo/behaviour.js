const Joi = require("@hapi/joi");

const { TodoValidationException } = require("../../utils/exceptions");

const { TodoData } = require("./data");

module.exports = {
    update
};

function update(data, updateData) {
    if (!data || !updateData) throw TodoValidationException();

    const { error } = validate();

    if (error) throw TodoValidationException(error.message);

    const todo = {
        ...data,
        ...updateData,
        updatedAt: Date.now()
    };

    return TodoData(todo);

    function validate() {
        const schema = makeValidationSchema();

        return schema.validate(updateData);

        function makeValidationSchema() {
            return Joi.object().keys({
                title: Joi.string()
                    .min(1)
                    .max(255),
                description: Joi.string()
                    .min(1)
                    .max(65500),
                isCompleted: Joi.boolean()
            });
        }
    }
}
