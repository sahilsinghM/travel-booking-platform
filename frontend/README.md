# TravelBooking - Frontend

A modern, responsive travel booking platform built with React, Tailwind CSS, and Vite.

## Features

- 🏠 **Home Page**: Hero section with search, featured destinations, and testimonials
- 🌍 **Packages**: Browse travel packages with filters, search, and pagination
- 📦 **Package Details**: Detailed view with gallery, itinerary, inclusions/exclusions
- 🎫 **Booking System**: Multi-step booking form with confirmation
- 🔐 **Authentication**: JWT-based login and signup
- 👑 **Admin Dashboard**: Manage packages, bookings, and users
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✨ **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Helmet Async** - SEO meta tags

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons
│   ├── components/     # Reusable components
│   │   ├── layout/    # Navbar, Footer
│   │   └── ui/        # Button, Card, Input
│   ├── context/       # React Context (Auth)
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Page components
│   │   ├── admin/    # Admin dashboard pages
│   │   └── auth/     # Login, Signup
│   ├── services/      # API services & mock data
│   ├── utils/         # Helper functions
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Demo Credentials

### User Account
- **Email**: john@example.com
- **Password**: password123

### Admin Account
- **Email**: admin@travelbooking.com
- **Password**: admin123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### User Features

1. **Browse Packages**: View all travel packages with filtering and search
2. **Package Details**: See comprehensive information about each package
3. **Booking**: Submit booking requests with traveler information
4. **Authentication**: Register and login to manage bookings

### Admin Features

1. **Dashboard**: Overview of packages, bookings, revenue, and users
2. **Manage Packages**: Create, edit, and delete travel packages
3. **Manage Bookings**: View and update booking statuses
4. **Manage Users**: View all registered users

## Mock API

The application uses a mock API service (`src/services/mockApi.js`) that simulates backend functionality with:
- Sample travel packages (6 destinations)
- User authentication with JWT-like tokens
- Booking management
- Local storage for persistence

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Color Scheme

The design uses a pastel blue/green theme:
- **Ocean Blue**: Primary color for CTAs and headers
- **Mint Green**: Secondary color for success states
- **Sand**: Accent color for highlights

## Future Enhancements

- [ ] Stripe payment integration
- [ ] Email notifications with Nodemailer
- [ ] Backend API integration
- [ ] User profile management
- [ ] Booking history for users
- [ ] Reviews and ratings system
- [ ] Advanced search with maps
- [ ] Multi-language support

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the root directory to `frontend`
4. Deploy!

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## License

MIT

## Support

For support, email support@travelbooking.com or open an issue in the repository.


