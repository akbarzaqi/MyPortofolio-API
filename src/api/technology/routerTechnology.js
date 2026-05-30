const express = require("express");
const { technologyHandler } = require("./index");
const { authenticateToken } = require("../../middleware/auth");
const { isAdmin } = require("../../middleware/isAdmin");

const router = express.Router();

router.post("/technology", authenticateToken, isAdmin, technologyHandler.postTechnologyHandler);
router.get("/technology", technologyHandler.getTechnologiesHandler);
router.get("/technology/:id", technologyHandler.getTechnologyByIdHandler);
router.put("/technology/:id", authenticateToken, isAdmin, technologyHandler.putTechnologyHandler);
router.delete("/technology/:id", authenticateToken, isAdmin, technologyHandler.deleteTechnologyHandler);

module.exports = router;