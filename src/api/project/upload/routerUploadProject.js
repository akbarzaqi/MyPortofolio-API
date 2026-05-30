const express = require("express");
const { uploadHandler } = require("./index");
const { authenticateToken } = require("../../../middleware/auth");
const { isAdmin } = require("../../../middleware/isAdmin");
const upload = require("../../../middleware/upload");

const router = express.Router();

router.post("/upload", authenticateToken, isAdmin, upload.single("cover"), uploadHandler.postUploadProjectHandler);

module.exports = router;