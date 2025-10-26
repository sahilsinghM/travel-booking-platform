const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');
const User = require('./models/User');
const indianPackages = require('./data/indianPackages');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error; // Re-throw for seed script
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Package.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@travelbooking.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+91-9876543210',
      role: 'admin'
    });

    console.log('👤 Created admin user:', adminUser.email);

    // Create test user
    const testUser = await User.create({
      email: 'john@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+91-9876543211',
      role: 'user'
    });

    console.log('👤 Created test user:', testUser.email);

    // Insert Indian packages
    const packages = await Package.insertMany(indianPackages);
    console.log(`📦 Created ${packages.length} Indian travel packages`);

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin: admin@travelbooking.com / admin123');
    console.log('User: john@example.com / password123');
    console.log('\n🌍 Indian Packages Created:');
    packages.forEach(pkg => {
      console.log(`- ${pkg.title} (${pkg.destination}) - ₹${pkg.price.toLocaleString()}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
