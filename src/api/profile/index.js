const { ProfileHandler } = require('./profileHandler');
const { ProfileService } = require('../../service/ProfileService');
const { ProfileValidator } = require('../../validator/profile/index');

const profileService = new ProfileService();
const profileValidator = ProfileValidator;
const profileHandler = new ProfileHandler(profileService, profileValidator);

module.exports = { profileHandler };