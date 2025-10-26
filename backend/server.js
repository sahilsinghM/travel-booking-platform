const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { cache } = require('./middleware/cache');

// Load env vars
dotenv.config();

// Connect to database (with error handling)
setTimeout(() => {
  connectDB().catch(err => {
    console.error('Database connection failed:', err.message);
  });
}, 1000); // Delay DB connection by 1 second to let server start first

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS
const allowedOrigins = [
  'https://travelqbx.in',
  'https://travel-booking-platform-dtyh.vercel.app',
  'https://travel-booking-platform.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Apply caching middleware to packages route
app.use('/api/packages', cache(5 * 60 * 1000)); // 5 minutes cache

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/settings', require('./routes/settings'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Travel Booking API is running',
    timestamp: new Date().toISOString()
  });
});

// Seed endpoint (temporary - remove in production)
const seedDatabase = require('./seed');
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Import CSV endpoint (temporary - remove in production)
const importCsv = async () => {
  const fs = require('fs');
  const csvParser = require('csv-parser');
  const path = require('path');
  const Package = require('./models/Package');

  return new Promise((resolve, reject) => {
    const packages = [];
    const csvPath = path.join(__dirname, 'pre_data', '100data.csv');

    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        const packageData = {
          title: row.title.trim(),
          destination: row.destination.trim(),
          duration: row.duration.trim(),
          price: parseFloat(row.price),
          originalPrice: row.originalPrice ? parseFloat(row.originalPrice) : undefined,
          rating: parseFloat(row.rating),
          reviews: parseInt(row.reviews),
          description: row.description.trim(),
          category: row.category.trim(),
          difficulty: row.difficulty.trim(),
          groupSize: row.groupSize.trim(),
          bestTime: row.bestTime.trim(),
          availability: parseInt(row.availability),
          images: row.images ? row.images.split(',').map(img => img.trim()) : [],
          itinerary: row.itinerary ? row.itinerary.split(';').map(item => item.trim()) : [],
          inclusions: row.inclusions ? row.inclusions.split(',').map(item => item.trim()) : [],
          exclusions: row.exclusions ? row.exclusions.split(',').map(item => item.trim()) : []
        };
        packages.push(packageData);
      })
      .on('end', async () => {
        try {
          await Package.deleteMany({});
          const inserted = await Package.insertMany(packages);
          resolve({ count: inserted.length, packages });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
};

app.post('/api/import-csv', async (req, res) => {
  try {
    const result = await importCsv();
    res.json({ 
      success: true, 
      message: `Successfully imported ${result.count} packages`,
      count: result.count 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handler
app.use(errorHandler);

// Handle 404 - must be last middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection:', err.message);
  // Don't exit - log the error and continue
});

module.exports = app;
