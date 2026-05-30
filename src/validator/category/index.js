const { CategoryPayloadSchema } = require('./schema');

const CategoryValidator = {
    validateCategoryPayload: (payload) => {
        const { error } = CategoryPayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid category payload: ${error.message}`);
        }
    }
}

module.exports = { CategoryValidator };