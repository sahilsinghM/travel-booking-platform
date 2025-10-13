const express = require('express');
const { body } = require('express-validator');
const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// @route   GET /api/packages
// @desc    Get all packages
// @access  Public
router.get('/', getPackages);

// @route   GET /api/packages/search
// @desc    Search packages
// @access  Public
router.get('/search', getPackages);

// @route   GET /api/packages/:id
// @desc    Get single package
// @access  Public
router.get('/:id', getPackage);

// @route   POST /api/packages
// @desc    Create new package
// @access  Private/Admin
router.post('/', [
  auth,
  admin,
  body('title').notEmpty().trim(),
  body('destination').notEmpty().trim(),
  body('duration').notEmpty().trim(),
  body('price').isNumeric().isFloat({ min: 0 }),
  body('description').notEmpty().trim(),
  body('category').isIn(['Beach', 'Mountain', 'Cultural', 'Adventure', 'Romantic', 'Luxury', 'Heritage', 'Wildlife']),
  body('difficulty').isIn(['Easy', 'Moderate', 'Challenging']),
  body('groupSize').notEmpty().trim(),
  body('bestTime').notEmpty().trim(),
  body('availability').isInt({ min: 0 })
], createPackage);

// @route   PUT /api/packages/:id
// @desc    Update package
// @access  Private/Admin
router.put('/:id', [
  auth,
  admin,
  body('title').optional().notEmpty().trim(),
  body('destination').optional().notEmpty().trim(),
  body('duration').optional().notEmpty().trim(),
  body('price').optional().isNumeric().isFloat({ min: 0 }),
  body('description').optional().notEmpty().trim(),
  body('category').optional().isIn(['Beach', 'Mountain', 'Cultural', 'Adventure', 'Romantic', 'Luxury', 'Heritage', 'Wildlife']),
  body('difficulty').optional().isIn(['Easy', 'Moderate', 'Challenging']),
  body('groupSize').optional().notEmpty().trim(),
  body('bestTime').optional().notEmpty().trim(),
  body('availability').optional().isInt({ min: 0 })
], updatePackage);

// @route   DELETE /api/packages/:id
// @desc    Delete package
// @access  Private/Admin
router.delete('/:id', [auth, admin], deletePackage);

module.exports = router;
