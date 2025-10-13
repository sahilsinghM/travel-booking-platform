const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Travel Booking API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint for packages (mock data)
app.get('/api/packages', (req, res) => {
  const mockPackages = [
    {
      id: 1,
      title: "Goa Beach Paradise",
      destination: "Goa, India",
      duration: "5 days",
      price: 25000,
      originalPrice: 30000,
      rating: 4.8,
      reviews: 1247,
      category: "Beach",
      difficulty: "Easy",
      groupSize: "2-8 people",
      bestTime: "November - March",
      availability: 15
    },
    {
      id: 2,
      title: "Himachal Mountain Trek",
      destination: "Manali, Himachal Pradesh",
      duration: "7 days",
      price: 35000,
      originalPrice: 40000,
      rating: 4.9,
      reviews: 892,
      category: "Mountain",
      difficulty: "Moderate",
      groupSize: "2-6 people",
      bestTime: "May - October",
      availability: 8
    }
  ];

  res.json({
    success: true,
    count: mockPackages.length,
    data: mockPackages
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Packages: http://localhost:${PORT}/api/packages`);
});
