const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(auth, (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
  }, updateSettings);

module.exports = router;

