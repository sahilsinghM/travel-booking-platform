const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Package = require('../models/Package');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add user ID to booking data
    req.body.userId = req.user._id;

    // Verify package exists and get package details
    const package = await Package.findById(req.body.packageId);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    // Add package title to booking
    req.body.packageTitle = package.title;

    const booking = await Booking.create(req.body);
    
    // Populate package details
    await booking.populate('packageId', 'title destination images');
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res, next) => {
  try {
    let query = {};
    
    // If user is not admin, only show their bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'firstName lastName email')
      .populate('packageId', 'title destination images')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };
    
    // If user is not admin, only show their own booking
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const booking = await Booking.findOne(query)
      .populate('userId', 'firstName lastName email')
      .populate('packageId', 'title destination images');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName email')
     .populate('packageId', 'title destination images');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus
};
