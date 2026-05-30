const {SkillPayloadSchema} = require("./schema");

const SkillValidator = {
    validateSkillPayload(payload) {
        const { error } = SkillPayloadSchema.validate(payload);
        if (error) {
            throw new Error(`Invalid payload: ${error.message}`);
        }
    }
}

module.exports = { SkillValidator };