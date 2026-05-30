const express = require('express');

const { educationHandler } = require('./index');

const { authenticateToken } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/isAdmin');

const router = express.Router();

router.post('/education', authenticateToken, isAdmin, educationHandler.postEducationHandler);
router.get('/education', educationHandler.getAllEducationHandler);
router.get('/education/:id', authenticateToken, isAdmin, educationHandler.getEducationByIdHandler);
router.put('/education/:id', authenticateToken, isAdmin, educationHandler.updateEducationHandler);
router.delete('/education/:id', authenticateToken, isAdmin, educationHandler.deleteEducationHandler);

module.exports = router;