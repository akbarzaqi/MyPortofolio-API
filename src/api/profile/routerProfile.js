const express = require('express');

const { profileHandler } = require('./index');
const { authenticateToken } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/isAdmin');

const router = express.Router();

router.post('/profile', authenticateToken, isAdmin, profileHandler.postProfileHandler);
router.get('/profile/:user_id', profileHandler.getProfileByUserIDHandler);
router.put('/profile/:user_id', authenticateToken, isAdmin, profileHandler.putProfileHandler);

module.exports = router;