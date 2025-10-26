const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await Settings.create({
        contact: {
          phone: '+91 9599667129',
          email: 'quantumbox50@gmail.com',
          address: 'Gurugram, Haryana, India'
        },
        homepage: {
          heroTitle: 'Discover Your Next Adventure',
          heroSubtitle: 'Explore breathtaking destinations, create unforgettable memories, and find the perfect travel package for your dream vacation.',
          stats: {
            travelers: 5000,
            destinations: 6,
            reviews: 2500,
            satisfaction: 98
          }
        },
        footer: {
          companyInfo: 'Discover amazing destinations and create unforgettable memories with our carefully curated travel packages.',
          destinations: ['Goa, India', 'Manali, Himachal Pradesh', 'Kerala Backwaters', 'Andaman Islands']
        },
        testimonials: [
          {
            name: 'Priya Sharma',
            location: 'Mumbai, Maharashtra',
            rating: 5,
            text: 'The Ladakh trip was absolutely breathtaking! The landscapes were stunning and the service was excellent. Highly recommended for adventure lovers!',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
          },
          {
            name: 'Rahul Patel',
            location: 'Ahmedabad, Gujarat',
            rating: 5,
            text: 'Goa family package was perfect! The beaches were beautiful and the activities were well organized. Will definitely book through them again.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
          },
          {
            name: 'Anjali Reddy',
            location: 'Bangalore, Karnataka',
            rating: 5,
            text: 'Kerala backwaters tour was magical! The houseboat experience was incredible and the food was delicious. Truly unforgettable!',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
          }
        ]
      });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res, next) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
      upsert: true // Create if not exists
    });
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings
};

