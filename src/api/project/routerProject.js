const express = require('express');
const { projectHandler } = require('./index');
const { authenticateToken } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/isAdmin');

const router = express.Router();

router.post('/projects', authenticateToken, isAdmin, projectHandler.postProjectHandler);
router.get('/projects/:id', authenticateToken, isAdmin, projectHandler.getProjectByIDHandler);
router.get('/projects', projectHandler.getProjectsHandler);
// router.put('/projects/:id/cover', authenticateToken, isAdmin, projectHandler.updateCoverImageHandler);
router.put('/projects/:id', authenticateToken, isAdmin, projectHandler.updateProjectHandler);
router.delete('/projects/:id', authenticateToken, isAdmin, projectHandler.deleteProjectHandler);

module.exports = router;    