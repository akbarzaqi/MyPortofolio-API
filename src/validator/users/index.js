const { UserPayloadSchema } = require("./schema");

const UsersValidator = {
    validateUserPayload: (payload) => {
        const { error } = UserPayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid user payload: ${error.message}`);
        }
    }
}

module.exports = { UsersValidator };