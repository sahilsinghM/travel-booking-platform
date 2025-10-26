const mongoose = require('mongoose');
const Settings = require('../models/Settings');
const { validationResult } = require('express-validator');

// Get settings
exports.getSettings = async (req, res) => {
  try {
    // Check if mongoose is connected
    if (!mongoose.connection.readyState) {
      // Return default settings if DB not connected
      return res.status(200).json({
        success: true,
        data: {
          siteInfo: { name: 'TravelBooking', logo: '', tagline: 'Discover amazing destinations' },
          contact: { phone: '+91 9599667129', email: 'support@travelqbx.in', address: 'Gurugram, Haryana, India', socialMedia: {} },
          homepage: { heroTitle: 'Discover Your Next Adventure', heroSubtitle: 'Explore breathtaking destinations', stats: { travelers: 5000, destinations: 50, reviews: 2500, satisfaction: 98 } },
          footer: { companyInfo: 'Discover amazing destinations', destinations: [], quickLinks: [] },
          testimonials: []
        }
      });
    }
    
    const settings = await Settings.getSettings();
    
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
      error: error.message
    });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    // Get current settings or create if doesn't exist
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }

    // Update fields
    const updateData = {};
    
    if (req.body.siteInfo) {
      updateData.siteInfo = {
        ...settings.siteInfo,
        ...req.body.siteInfo
      };
    }
    
    if (req.body.contact) {
      updateData.contact = {
        ...settings.contact,
        ...req.body.contact,
        socialMedia: {
          ...settings.contact.socialMedia,
          ...req.body.contact.socialMedia
        }
      };
    }
    
    if (req.body.homepage) {
      updateData.homepage = {
        ...settings.homepage,
        ...req.body.homepage,
        stats: {
          ...settings.homepage.stats,
          ...req.body.homepage.stats
        }
      };
    }
    
    if (req.body.footer) {
      updateData.footer = {
        ...settings.footer,
        ...req.body.footer
      };
    }
    
    if (req.body.testimonials) {
      updateData.testimonials = req.body.testimonials;
    }

    // Update settings
    settings = await Settings.findByIdAndUpdate(
      settings._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message
    });
  }
};

