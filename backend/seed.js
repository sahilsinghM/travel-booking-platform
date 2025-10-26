const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');
const User = require('./models/User');
const Settings = require('./models/Settings');
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
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Package.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create or update settings
    await Settings.deleteMany({});
    const settings = await Settings.create({
      contact: {
        phone: '+91 9599667129',
        email: 'support@travelqbx.in',
        address: 'Gurugram, Haryana, India'
      },
      homepage: {
        stats: {
          travelers: 5000,
          destinations: 6,
          reviews: 2500,
          satisfaction: 98
        }
      },
      footer: {
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
    console.log('⚙️  Created settings');

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
