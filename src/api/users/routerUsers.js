const express = require("express");
const { usersHandler } = require("./index");

const router = express.Router();

router.post("/users", usersHandler.postUserHandler);
router.post("/login", usersHandler.loginUserHandler);

module.exports = router;