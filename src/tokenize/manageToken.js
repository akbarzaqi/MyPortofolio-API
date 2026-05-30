const jwt = require("jsonwebtoken");

class ManageToken {
    generateToken(payload) {
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: "23h" });
        return token;
    }
}

module.exports = { ManageToken };