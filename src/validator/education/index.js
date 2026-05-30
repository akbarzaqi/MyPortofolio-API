const { EducationPayloadSchema } = require('./schema');

const EducationValidator = {
    validateEducationPayload(payload) {
        const { error } = EducationPayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid education payload: ${error.message}`);
        }
    }
}

module.exports = { EducationValidator };