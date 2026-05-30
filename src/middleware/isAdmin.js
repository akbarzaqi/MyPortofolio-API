const isAdmin = (req, res, next) => {
    const userRole = req.user.role.role;

    console.log('users [middleware/isAdmin.js] isAdmin - userRole:', userRole);

    if (userRole !== "admin") {
        return res.status(403).json({
            status: "fail",
            message: "Access denied: Admins only",
        });
    }

    next();
}

module.exports = { isAdmin };