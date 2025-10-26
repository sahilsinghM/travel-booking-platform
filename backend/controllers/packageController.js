const { validationResult } = require('express-validator');
const Package = require('../models/Package');
const { invalidateCache } = require('../middleware/cache');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res, next) => {
  try {
    const { destination, category, minPrice, maxPrice, duration, search } = req.query;
    
    let query = {};
    
    // Build filter query
    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (duration) {
      query.duration = { $regex: duration, $options: 'i' };
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Use lean() for better performance on read-only queries
    const packages = await Package.find(query)
      .lean()
      .sort({ createdAt: -1 })
      .limit(50); // Limit results for better performance
    
    res.json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
const getPackage = async (req, res, next) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }
    
    res.json({
      success: true,
      data: package
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const package = await Package.create(req.body);
    
    // Invalidate cache after creating package
    invalidateCache('packages');
    
    res.status(201).json({
      success: true,
      data: package
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }
    
    // Invalidate cache after updating package
    invalidateCache('packages');
    
    res.json({
      success: true,
      data: package
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res, next) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }
    
    // Invalidate cache after deleting package
    invalidateCache('packages');
    
    res.json({
      success: true,
      message: 'Package deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
};
