const { ExperiencePayloadSchema } = require('./schema');

const ExperienceValidator = {
    validateExperiencePayload(payload) {
        const { error } = ExperiencePayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid experience payload: ${error.message}`);
        }
    }
}

module.exports = { ExperienceValidator };