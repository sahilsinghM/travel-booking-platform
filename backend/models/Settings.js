const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true,
    trim: true
  }
});

const settingsSchema = new mongoose.Schema({
  siteInfo: {
    name: {
      type: String,
      default: 'TravelBooking'
    },
    logo: {
      type: String,
      default: ''
    },
    tagline: {
      type: String,
      default: 'Discover amazing destinations'
    }
  },
  contact: {
    phone: {
      type: String,
      default: '+91 9599667129'
    },
    email: {
      type: String,
      default: 'support@travelqbx.in'
    },
    address: {
      type: String,
      default: 'Gurugram, Haryana, India'
    },
    socialMedia: {
      facebook: {
        type: String,
        default: ''
      },
      twitter: {
        type: String,
        default: ''
      },
      instagram: {
        type: String,
        default: ''
      },
      linkedin: {
        type: String,
        default: ''
      }
    }
  },
  homepage: {
    heroTitle: {
      type: String,
      default: 'Discover Your Next Adventure'
    },
    heroSubtitle: {
      type: String,
      default: 'Explore breathtaking destinations, create unforgettable memories, and find the perfect travel package for your dream vacation.'
    },
    stats: {
      travelers: {
        type: Number,
        default: 5000
      },
      destinations: {
        type: Number,
        default: 50
      },
      reviews: {
        type: Number,
        default: 2500
      },
      satisfaction: {
        type: Number,
        default: 98
      }
    }
  },
  footer: {
    companyInfo: {
      type: String,
      default: 'Discover amazing destinations and create unforgettable memories with our carefully curated travel packages.'
    },
    destinations: [{
      type: String,
      trim: true
    }],
    quickLinks: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      path: {
        type: String,
        required: true,
        trim: true
      }
    }]
  },
  testimonials: [testimonialSchema]
}, {
  timestamps: true
});

// Ensure only one settings document
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  
  if (!settings) {
    // Create default settings
    settings = await this.create({});
  }
  
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);

