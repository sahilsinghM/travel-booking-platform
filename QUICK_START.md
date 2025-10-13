# 🚀 Quick Start Guide

Get your travel booking platform running in 3 minutes!

## Step 1: Install Dependencies

```bash
cd frontend
npm install
```

This will install all required packages (~2 minutes).

## Step 2: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Step 3: Try It Out!

### Login as a User
1. Click "Sign In" in the navbar
2. Use these credentials:
   - Email: `john@example.com`
   - Password: `password123`
3. Browse packages, view details, and try booking!

### Login as Admin
1. Logout if you're logged in
2. Click "Sign In"
3. Use these credentials:
   - Email: `admin@travelbooking.com`
   - Password: `admin123`
4. Access admin dashboard from the navbar menu
5. Manage packages, bookings, and users!

## 🎯 What to Explore

### As a User:
- ✅ Browse the home page
- ✅ Search for destinations
- ✅ Filter packages by category, price, duration
- ✅ Click on a package to see details
- ✅ Try the booking process
- ✅ See the beautiful confirmation page

### As an Admin:
- ✅ View dashboard statistics
- ✅ Manage travel packages
- ✅ View and update booking requests
- ✅ See all registered users

## 📱 Test Responsive Design

- Resize your browser window
- Try it on your phone
- See the mobile menu in action

## 🎨 Customization

Want to customize? Start here:

### Change Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  'ocean-blue': { ... },  // Your primary color
  'mint-green': { ... },  // Your secondary color
}
```

### Add More Packages
Edit `frontend/src/services/mockApi.js`:
```js
const travelPackages = [
  // Add your packages here
];
```

### Modify Content
- Home page: `frontend/src/pages/Home.jsx`
- Packages: `frontend/src/pages/Packages.jsx`

## 🔧 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## 🌟 Features to Try

1. **Search**: Use the search bar on the home page
2. **Filters**: Filter packages by category, price, duration
3. **Booking**: Complete a full booking (it's simulated)
4. **Admin**: Manage packages and bookings
5. **Responsive**: Resize browser to see mobile design

## 📚 Need More Help?

- **Setup Issues**: Check `frontend/README.md`
- **Technical Details**: Read `IMPLEMENTATION_GUIDE.md`
- **Overview**: See `PROJECT_SUMMARY.md`

## 🚀 Deploy to Production

### Vercel (Easiest - Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Click Deploy!

Your site will be live in minutes! ✨

## ✅ Everything Working?

You should see:
- ✅ Beautiful home page with hero section
- ✅ Navigation bar with login/signup
- ✅ Featured travel packages
- ✅ Smooth animations
- ✅ Responsive design

## 🎉 That's It!

You're ready to go! Explore the app, customize it, and when ready, build the backend to make it fully functional.

**Happy coding!** 🌍✈️

---

**Quick Links:**
- [Full Documentation](IMPLEMENTATION_GUIDE.md)
- [Project Summary](PROJECT_SUMMARY.md)
- [Frontend README](frontend/README.md)


