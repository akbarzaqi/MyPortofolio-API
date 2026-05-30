const express = require('express');
const { skillHandler } = require('./index');
const { authenticateToken } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/isAdmin');

const router = express.Router();

router.post('/skills', authenticateToken, isAdmin, skillHandler.postSkillHandler);
router.get('/skills', skillHandler.getAllSkillsHandler);
router.get('/skills/:id', authenticateToken, isAdmin, skillHandler.getSkillByIdHandler);
router.put('/skills/:id', authenticateToken, isAdmin, skillHandler.updateSkillHandler);
router.delete('/skills/:id', authenticateToken, isAdmin, skillHandler.deleteSkillHandler);

module.exports = router;