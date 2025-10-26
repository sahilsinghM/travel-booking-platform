const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteInfo: {
    name: { type: String, default: 'Travelqbx' },
    logoUrl: { type: String, default: '' }
  },
  contact: {
    phone: { type: String, default: '+91 9599667129' },
    email: { type: String, default: 'quantumbox50@gmail.com' },
    address: { type: String, default: 'Gurugram, Haryana, India' },
    socialMedia: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' }
    }
  },
  homepage: {
    heroTitle: { type: String, default: 'Discover Your Next Adventure' },
    heroSubtitle: { type: String, default: 'Explore breathtaking destinations, create unforgettable memories, and find the perfect travel package for your dream vacation.' },
    stats: {
      travelers: { type: Number, default: 5000 },
      destinations: { type: Number, default: 6 },
      reviews: { type: Number, default: 2500 },
      satisfaction: { type: Number, default: 98 }
    }
  },
  footer: {
    companyInfo: { type: String, default: 'Discover amazing destinations and create unforgettable memories with our carefully curated travel packages.' },
    destinations: [{ type: String }]
  },
  testimonials: [{
    name: { type: String },
    location: { type: String },
    rating: { type: Number },
    text: { type: String },
    avatar: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);

