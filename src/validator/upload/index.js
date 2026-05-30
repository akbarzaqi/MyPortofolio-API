const {UploadPayloadSchema} = require('./schema');

const UploadValidator = {
    validateUploadPayload: (payload) => {
        const validationResult = UploadPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }
    }
}

module.exports = { UploadValidator };