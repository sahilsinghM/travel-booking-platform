#!/bin/bash

echo "🚀 Travel Booking App - Vercel Deployment Script"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the frontend directory"
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "📦 Building the project..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
fi

echo "✅ Build completed successfully!"
echo ""
echo "🌐 Deployment Options:"
echo "1. Via Vercel CLI: npx vercel"
echo "2. Via Vercel Dashboard: https://vercel.com/new"
echo ""
echo "📁 Your dist folder is ready for deployment!"
echo "   - index.html"
echo "   - assets/ (CSS, JS files)"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Drag and drop the 'dist' folder"
echo "3. Or connect your GitHub repository"
echo "4. Vercel will auto-detect Vite settings"
echo ""
echo "✨ Your travel booking app will be live in minutes!"
