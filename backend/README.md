# Travel Booking Backend API

A Node.js/Express backend API for the Indian Travel Booking Platform with MongoDB, JWT authentication, and comprehensive travel package management.

## Features

- 🔐 JWT-based authentication (register, login, protected routes)
- 👥 User management with role-based access (user/admin)
- 📦 Travel package CRUD operations
- 🎫 Booking management system
- 🇮🇳 Indian destinations with INR pricing
- 🛡️ Input validation and error handling
- 📊 MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for frontend communication

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-booking
JWT_SECRET=your-super-secret-jwt-key-for-travel-booking-app-2024
JWT_EXPIRE=24h
NODE_ENV=development
```

3. Start MongoDB locally

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user

### Packages
- `GET /api/packages` - Get all packages (with filters)
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)
- `GET /api/packages/search?q=` - Search packages

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get bookings (user's own or all for admin)
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status (admin)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)

## Test Accounts

After seeding:
- **Admin**: `admin@travelbooking.com` / `admin123`
- **User**: `john@example.com` / `password123`

## Indian Travel Packages

The database includes 6 Indian destinations:
- Goa Beach Paradise (₹25,000)
- Himachal Mountain Trek (₹35,000)
- Kerala Backwaters (₹30,000)
- Rajasthan Heritage Tour (₹40,000)
- Ladakh Adventure (₹50,000)
- Andaman Islands (₹45,000)

## Usage with Frontend

The API is configured to work with the React frontend running on `http://localhost:5173`. Update your frontend's API service to point to `http://localhost:5000/api`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/travel-booking |
| JWT_SECRET | Secret key for JWT tokens | Required |
| JWT_EXPIRE | JWT token expiration | 24h |
| NODE_ENV | Environment mode | development |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
