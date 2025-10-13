#!/bin/bash

echo "🚀 Indian Travel Backend - Deployment Preparation"
echo "================================================="

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

echo "✅ Backend directory confirmed"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "Please create .env file with your MongoDB Atlas connection string"
    exit 1
fi

echo "✅ Environment file found"

# Check if MongoDB connection works
echo "🔗 Testing MongoDB Atlas connection..."
node test-connection.js

if [ $? -eq 0 ]; then
    echo "✅ MongoDB Atlas connection successful"
else
    echo "❌ MongoDB Atlas connection failed"
    echo "Please check your .env file and Atlas credentials"
    exit 1
fi

# Check if server starts
echo "🚀 Testing server startup..."
timeout 10 node server.js &
SERVER_PID=$!
sleep 3

if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server starts successfully"
    kill $SERVER_PID
else
    echo "❌ Server failed to start"
    exit 1
fi

echo ""
echo "🎉 Backend is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://railway.app or https://render.com"
echo "2. Connect your GitHub repository"
echo "3. Set root directory to 'backend'"
echo "4. Add environment variables:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your-atlas-connection-string"
echo "   - JWT_SECRET=your-secret-key"
echo "   - JWT_EXPIRE=24h"
echo "5. Deploy!"
echo ""
echo "🌍 Your Indian travel packages will be live!"
