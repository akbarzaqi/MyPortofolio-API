const express = require('express');
const { experienceHandler } = require('./index');
const { authenticateToken } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/isAdmin');

const router = express.Router();

router.post('/experience', authenticateToken, isAdmin, experienceHandler.postExperienceHandler);
router.get('/experience', experienceHandler.getAllExperienceHandler);
router.get('/experience/:id', authenticateToken, isAdmin, experienceHandler.getExperienceByIdHandler);
router.put('/experience/:id', authenticateToken, isAdmin, experienceHandler.updateExperienceHandler);
router.delete('/experience/:id', authenticateToken, isAdmin, experienceHandler.deleteExperienceHandler);

module.exports = router;