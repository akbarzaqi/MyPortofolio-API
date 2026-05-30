const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: "fail",
            message: "Access token is missing",
        });
    }

    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, user) => {
        console.log('users [middleware/auth.js] authenticateToken - user:', user);
        if (err) {
            return res.status(403).json({
                status: "fail",
                message: "Invalid access token",
            });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };