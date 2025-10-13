#!/bin/bash

echo "🚀 Indian Travel Frontend - Deployment Guide"
echo "============================================="

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    exit 1
fi

echo "✅ Frontend directory confirmed"

# Check if build works
echo "🔨 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 Frontend is ready for deployment!"
echo ""
echo "📋 Deployment Options:"
echo ""
echo "1. 🌐 Vercel Dashboard (Recommended):"
echo "   - Go to: https://vercel.com/dashboard"
echo "   - Click 'Add New Project'"
echo "   - Import: sahilsinghM/travel-booking-platform"
echo "   - Set Root Directory: frontend"
echo "   - Deploy!"
echo ""
echo "2. 💻 Vercel CLI:"
echo "   - Run: npx vercel login"
echo "   - Run: npx vercel --prod"
echo ""
echo "3. 📦 Manual Upload:"
echo "   - Upload the 'dist' folder to any static hosting service"
echo ""
echo "🔗 Your frontend will connect to:"
echo "   Backend API: https://travel-booking-platform-2i9o.onrender.com/api"
echo ""
echo "🌍 After deployment, you'll have:"
echo "   ✅ Indian travel packages with INR pricing"
echo "   ✅ User authentication and booking system"
echo "   ✅ Admin panel for package management"
echo "   ✅ Responsive design for all devices"
