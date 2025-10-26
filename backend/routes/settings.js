const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(protect, authorize('admin'), updateSettings);

module.exports = router;

