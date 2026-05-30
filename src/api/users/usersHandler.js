const autoBind = require("auto-bind").default;
const { ManageToken } = require("../../tokenize/manageToken");

class UsersHandler {
    constructor(usersService, usersValidator) {
        this._usersService = usersService;
        this._usersValidator = usersValidator;
        this._manageToken = new ManageToken();

        autoBind(this);
    }

    async postUserHandler(req, res) {
        try {
            this._usersValidator.validateUserPayload(req.body);

            const userId = await this._usersService.createUser(req.body);

            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: {
                    userId,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }

    async loginUserHandler(req, res) {
        try {
            const { email, password } = req.body;
            const userId = await this._usersService.verifyUserCredentials(email, password);
            const role = await this._usersService.getUserById(userId);

            const token = this._manageToken.generateToken({ userId, role });

            res.status(200).json({
                status: "success",
                message: "Login successfully",
                data: {
                    token,
                    userId,
                    role: role.role,
                },
            });
        } catch (error) {
            res.status(401).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = { UsersHandler };