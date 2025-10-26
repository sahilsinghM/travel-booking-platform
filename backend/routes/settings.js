const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings
} = require('../controllers/settingsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getSettings);

// Protected admin routes
router.put('/', isAuthenticated, isAdmin, updateSettings);

module.exports = router;

