const { ProfilePayloadSchema } = require('./schema');

const ProfileValidator = {
    validateProfilePayload(payload) {
        const { error } = ProfilePayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid profile payload: ${error.message}`);
        }
    }
}

module.exports = { ProfileValidator };