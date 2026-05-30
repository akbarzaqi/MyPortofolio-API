const autoBind = require("auto-bind").default;

class ProfileHandler {
    constructor(profileService, profileValidator) {
        this._profileService = profileService;
        this._profileValidator = profileValidator;

        autoBind(this);
    }

    async postProfileHandler(req, res) {
        try {
            this._profileValidator.validateProfilePayload(req.body);
            const { user_id, full_name, bio, location, social_links, headline } = req.body;
            const profileId = await this._profileService.createProfile({ user_id, full_name, bio, location, social_links, headline });

            res.status(201).json({
                status: "success",
                message: "Profile created successfully",
                data: {
                    profileId,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async getProfileByUserIDHandler(req, res) {
        try {
            const { user_id } = req.params;
            const profile = await this._profileService.getProfileByUserId(user_id);

            res.status(200).json({
                status: "success",
                data: {
                    profile,
                },
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async putProfileHandler(req, res) {
        try {
            this._profileValidator.validateProfilePayload(req.body);
            const { user_id } = req.params;
            const { full_name, bio, location, social_links, headline } = req.body;
            await this._profileService.updateProfile(user_id, { full_name, bio, location, social_links, headline });

            res.status(200).json({
                status: "success",
                message: "Profile updated successfully",
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = { ProfileHandler };