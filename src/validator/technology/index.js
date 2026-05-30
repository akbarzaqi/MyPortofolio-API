const { TechnologyPayloadSchema } = require("./schema");

const TechnologyValidator = {
    validateTechnologyPayload: (payload) => {
        const { error } = TechnologyPayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid technology payload: ${error.message}`);
        }
    }
}

module.exports = { TechnologyValidator };