const { ProjectPayloadSchema } = require("./schema");

const ProjectValidator = {
    validateProjectPayload: (payload) => {
        const { error } = ProjectPayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid project payload: ${error.message}`);
        }
    }
}

module.exports = { ProjectValidator };