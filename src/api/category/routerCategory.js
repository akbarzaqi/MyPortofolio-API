const express = require('express');

const { categoryHandler } = require('./index');
const { authenticateToken } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/isAdmin');

const router = express.Router();

router.post('/category', authenticateToken, isAdmin, categoryHandler.postCategoryHandler);
router.get('/category', categoryHandler.getCategoryHandler);
router.get('/category/:id', authenticateToken, isAdmin, categoryHandler.getCategoryByIdHandler);
router.put('/category/:id', authenticateToken, isAdmin, categoryHandler.putCategoryHandler);
router.delete('/category/:id', authenticateToken, isAdmin, categoryHandler.deleteCategoryHandler);

module.exports = router;    