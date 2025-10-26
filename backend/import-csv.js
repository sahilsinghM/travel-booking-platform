const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const Package = require('./models/Package');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const importCSV = async () => {
  try {
    await connectDB();

    // Read and parse CSV
    const packages = [];
    const csvPath = path.join(__dirname, 'pre_data', '100data.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csvParser())
        .on('data', (row) => {
          // Parse arrays from CSV (they're stored as comma-separated strings)
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
            
            // Parse comma-separated strings into arrays
            images: row.images 
              ? row.images.split(',').map(img => img.trim()) 
              : [],
            itinerary: row.itinerary 
              ? row.itinerary.split(';').map(item => item.trim()) 
              : [],
            inclusions: row.inclusions 
              ? row.inclusions.split(',').map(item => item.trim()) 
              : [],
            exclusions: row.exclusions 
              ? row.exclusions.split(',').map(item => item.trim()) 
              : []
          };
          packages.push(packageData);
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    console.log(`📦 Parsed ${packages.length} packages from CSV`);

    // Clear existing packages
    await Package.deleteMany({});
    console.log('🗑️  Cleared existing packages');

    // Insert new packages
    const inserted = await Package.insertMany(packages);
    console.log(`✅ Successfully imported ${inserted.length} packages to MongoDB`);

    // Show summary
    console.log('\n📊 Import Summary:');
    const categories = {};
    inserted.forEach(pkg => {
      categories[pkg.category] = (categories[pkg.category] || 0) + 1;
    });
    console.log('\nPackages by Category:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
};

importCSV();

