const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Package title is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  images: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  itinerary: [{
    type: String,
    trim: true
  }],
  inclusions: [{
    type: String,
    trim: true
  }],
  exclusions: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Beach', 'Mountain', 'Cultural', 'Adventure', 'Romantic', 'Luxury', 'Heritage', 'Wildlife'],
    trim: true
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Easy', 'Moderate', 'Challenging'],
    trim: true
  },
  groupSize: {
    type: String,
    required: [true, 'Group size is required'],
    trim: true
  },
  bestTime: {
    type: String,
    required: [true, 'Best time to visit is required'],
    trim: true
  },
  availability: {
    type: Number,
    required: [true, 'Availability is required'],
    min: 0,
    default: 10
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
packageSchema.index({ destination: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ category: 1 });
packageSchema.index({ createdAt: -1 });
packageSchema.index({ rating: -1 });
packageSchema.index({ title: 'text', destination: 'text', description: 'text' });

module.exports = mongoose.model('Package', packageSchema);
