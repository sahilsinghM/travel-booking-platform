const express = require('express');
const { body } = require('express-validator');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', [
  auth,
  body('packageId').isMongoId(),
  body('travelerDetails.firstName').notEmpty().trim(),
  body('travelerDetails.lastName').notEmpty().trim(),
  body('travelerDetails.email').isEmail().normalizeEmail(),
  body('travelerDetails.phone').notEmpty().trim(),
  body('travelDates.startDate').isISO8601(),
  body('travelDates.endDate').isISO8601(),
  body('numberOfTravelers').isInt({ min: 1, max: 20 }),
  body('totalAmount').isNumeric().isFloat({ min: 0 })
], createBooking);

// @route   GET /api/bookings
// @desc    Get bookings (all for admin, user's own for regular users)
// @access  Private
router.get('/', auth, getBookings);

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', auth, getBooking);

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private/Admin
router.put('/:id/status', [
  auth,
  admin,
  body('status').optional().isIn(['pending', 'confirmed', 'cancelled']),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'refunded'])
], updateBookingStatus);

module.exports = router;
