const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔗 Testing MongoDB Atlas connection...');
    console.log('Connection string:', process.env.MONGODB_URI?.replace(/\/\/.*@/, '//***:***@'));
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Atlas Connected Successfully!');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name}`);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🔧 Authentication Error - Check:');
      console.log('1. Username is correct');
      console.log('2. Password is correct');
      console.log('3. User exists in Atlas');
      console.log('4. User has proper permissions');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 Network Error - Check:');
      console.log('1. Cluster name is correct');
      console.log('2. Internet connection is working');
    }
  }
};

testConnection();
