#!/bin/bash

echo "🚀 Indian Travel Booking Backend Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed."
    echo "📦 Installing MongoDB..."
    
    # Update package list
    sudo apt update
    
    # Install MongoDB
    sudo apt install -y mongodb
    
    # Start MongoDB service
    sudo systemctl start mongodb
    sudo systemctl enable mongodb
    
    echo "✅ MongoDB installed and started"
else
    echo "✅ MongoDB is installed"
    
    # Start MongoDB if not running
    if ! pgrep -x "mongod" > /dev/null; then
        echo "🔄 Starting MongoDB..."
        sudo systemctl start mongodb
    fi
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-booking
JWT_SECRET=your-super-secret-jwt-key-for-travel-booking-app-2024
JWT_EXPIRE=24h
NODE_ENV=development
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Seed the database
echo "🌱 Seeding database with Indian travel packages..."
npm run seed

echo ""
echo "🎉 Backend setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "2. Start the frontend server:"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Test accounts:"
echo "   Admin: admin@travelbooking.com / admin123"
echo "   User: john@example.com / password123"
echo ""
echo "4. API endpoints:"
echo "   Health: http://localhost:5000/api/health"
echo "   Packages: http://localhost:5000/api/packages"
echo ""
echo "🌍 Indian packages available:"
echo "   - Goa Beach Paradise (₹25,000)"
echo "   - Himachal Mountain Trek (₹35,000)"
echo "   - Kerala Backwaters (₹30,000)"
echo "   - Rajasthan Heritage Tour (₹40,000)"
echo "   - Ladakh Adventure (₹50,000)"
echo "   - Andaman Islands (₹45,000)"
