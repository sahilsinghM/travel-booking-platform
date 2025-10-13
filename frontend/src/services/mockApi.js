// Mock API service with sample data
const MOCK_DELAY = 800; // Simulate network delay

// Sample travel packages
const travelPackages = [
  {
    id: 1,
    title: "Bali Paradise Getaway",
    destination: "Bali, Indonesia",
    duration: "7 days",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 1247,
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800"
    ],
    description: "Experience the magic of Bali with pristine beaches, ancient temples, and lush rice terraces.",
    itinerary: [
      "Day 1: Arrival in Denpasar, transfer to Ubud",
      "Day 2: Visit Tegallalang Rice Terraces and Sacred Monkey Forest",
      "Day 3: Explore Uluwatu Temple and enjoy sunset dinner",
      "Day 4: Beach day at Seminyak with water sports",
      "Day 5: Cultural tour of Besakih Temple",
      "Day 6: Free day for shopping and spa treatments",
      "Day 7: Departure"
    ],
    inclusions: [
      "6 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "Airport transfers",
      "All entrance fees",
      "English speaking guide",
      "Travel insurance"
    ],
    exclusions: [
      "International flights",
      "Personal expenses",
      "Optional activities",
      "Tips and gratuities"
    ],
    category: "Beach",
    difficulty: "Easy",
    groupSize: "2-12 people",
    bestTime: "April - October",
    availability: 15
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    destination: "Switzerland",
    duration: "10 days",
    price: 2899,
    originalPrice: 3299,
    rating: 4.9,
    reviews: 892,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759844-d150baecf7b2?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    description: "Discover the breathtaking beauty of the Swiss Alps with mountain peaks, crystal-clear lakes, and charming villages.",
    itinerary: [
      "Day 1: Arrival in Zurich, city tour",
      "Day 2: Train to Interlaken, explore the region",
      "Day 3: Jungfraujoch - Top of Europe",
      "Day 4: Grindelwald and hiking trails",
      "Day 5: Lake Thun boat cruise",
      "Day 6: Travel to Zermatt",
      "Day 7: Matterhorn viewing and hiking",
      "Day 8: Glacier Express train journey",
      "Day 9: Lucerne city tour",
      "Day 10: Departure from Zurich"
    ],
    inclusions: [
      "9 nights accommodation in 3-star hotels",
      "Daily breakfast",
      "Swiss Travel Pass",
      "Jungfraujoch excursion",
      "Glacier Express ticket",
      "City tours with guide"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Mountain",
    difficulty: "Moderate",
    groupSize: "2-8 people",
    bestTime: "June - September",
    availability: 8
  },
  {
    id: 3,
    title: "Tokyo Cultural Experience",
    destination: "Tokyo, Japan",
    duration: "8 days",
    price: 2199,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 1563,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800"
    ],
    description: "Immerse yourself in Japanese culture with traditional temples, modern districts, and authentic cuisine.",
    itinerary: [
      "Day 1: Arrival in Tokyo, Asakusa district",
      "Day 2: Senso-ji Temple and Tokyo Skytree",
      "Day 3: Harajuku and Shibuya exploration",
      "Day 4: Day trip to Nikko",
      "Day 5: Tsukiji Fish Market and Ginza",
      "Day 6: Imperial Palace and Ueno Park",
      "Day 7: Free day for shopping in Akihabara",
      "Day 8: Departure"
    ],
    inclusions: [
      "7 nights accommodation in 3-star hotel",
      "Daily breakfast",
      "JR Pass for local transport",
      "Nikko day trip",
      "Traditional tea ceremony",
      "Tokyo Skytree entrance"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Cultural",
    difficulty: "Easy",
    groupSize: "2-10 people",
    bestTime: "March - May, September - November",
    availability: 12
  },
  {
    id: 4,
    title: "Santorini Sunset Romance",
    destination: "Santorini, Greece",
    duration: "6 days",
    price: 1899,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 743,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800"
    ],
    description: "Experience the romance of Santorini with stunning sunsets, white-washed buildings, and crystal-clear waters.",
    itinerary: [
      "Day 1: Arrival in Santorini, Fira town",
      "Day 2: Oia village and sunset viewing",
      "Day 3: Wine tasting tour",
      "Day 4: Red Beach and archaeological sites",
      "Day 5: Boat trip to nearby islands",
      "Day 6: Departure"
    ],
    inclusions: [
      "5 nights accommodation in boutique hotel",
      "Daily breakfast",
      "Airport transfers",
      "Wine tasting tour",
      "Boat trip to islands",
      "Sunset dinner cruise"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Romantic",
    difficulty: "Easy",
    groupSize: "2-6 people",
    bestTime: "May - October",
    availability: 6
  },
  {
    id: 5,
    title: "Machu Picchu Trek",
    destination: "Peru",
    duration: "12 days",
    price: 3299,
    originalPrice: 3699,
    rating: 4.8,
    reviews: 456,
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
      "https://images.unsplash.com/photo-1587595431973-160d1d94c735?w=800",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800"
    ],
    description: "Embark on an unforgettable journey to the ancient Incan citadel of Machu Picchu through the Sacred Valley.",
    itinerary: [
      "Day 1: Arrival in Lima",
      "Day 2: Flight to Cusco, city tour",
      "Day 3: Sacred Valley exploration",
      "Day 4: Ollantaytambo fortress",
      "Day 5-8: Inca Trail trek",
      "Day 9: Machu Picchu sunrise tour",
      "Day 10: Return to Cusco",
      "Day 11: Free day in Cusco",
      "Day 12: Departure"
    ],
    inclusions: [
      "11 nights accommodation",
      "All meals during trek",
      "Professional trekking guide",
      "Machu Picchu entrance",
      "Train tickets",
      "Camping equipment"
    ],
    exclusions: [
      "International flights",
      "Personal trekking gear",
      "Tips and gratuities",
      "Optional activities"
    ],
    category: "Adventure",
    difficulty: "Challenging",
    groupSize: "2-8 people",
    bestTime: "May - September",
    availability: 4
  },
  {
    id: 6,
    title: "Dubai Luxury Experience",
    destination: "Dubai, UAE",
    duration: "5 days",
    price: 2499,
    originalPrice: 2799,
    rating: 4.6,
    reviews: 1123,
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    description: "Experience the opulence of Dubai with luxury hotels, world-class shopping, and iconic landmarks.",
    itinerary: [
      "Day 1: Arrival, Burj Khalifa visit",
      "Day 2: Desert safari with dinner",
      "Day 3: Dubai Mall and shopping",
      "Day 4: Palm Jumeirah and Atlantis",
      "Day 5: Departure"
    ],
    inclusions: [
      "4 nights in 5-star hotel",
      "Daily breakfast",
      "Burj Khalifa entrance",
      "Desert safari with dinner",
      "Dubai Mall shopping voucher",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Luxury",
    difficulty: "Easy",
    groupSize: "2-6 people",
    bestTime: "November - March",
    availability: 10
  }
];

// Sample users
const users = [
  {
    id: 1,
    email: "admin@travelbooking.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    id: 2,
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: 3,
    email: "jane@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
  }
];

// Sample bookings
let bookings = [
  {
    id: 1,
    userId: 2,
    packageId: 1,
    packageTitle: "Bali Paradise Getaway",
    travelerDetails: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890"
    },
    travelDates: {
      startDate: "2024-03-15",
      endDate: "2024-03-22"
    },
    totalAmount: 1299,
    status: "confirmed",
    bookingDate: "2024-01-15",
    paymentStatus: "paid"
  },
  {
    id: 2,
    userId: 3,
    packageId: 3,
    packageTitle: "Tokyo Cultural Experience",
    travelerDetails: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+1234567891"
    },
    travelDates: {
      startDate: "2024-04-20",
      endDate: "2024-04-28"
    },
    totalAmount: 2199,
    status: "pending",
    bookingDate: "2024-02-10",
    paymentStatus: "pending"
  }
];

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate JWT-like token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

// Parse JWT-like token
const parseToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

// Mock API functions
export const mockApi = {
  // Authentication
  async login(email, password) {
    await delay(MOCK_DELAY);
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const token = generateToken(user);
      localStorage.setItem('authToken', token);
      return { success: true, user: { ...user, password: undefined }, token };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  async register(userData) {
    await delay(MOCK_DELAY);
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'user',
      avatar: `https://images.unsplash.com/photo-${1507003211169 + users.length}?w=150`
    };
    users.push(newUser);
    const token = generateToken(newUser);
    localStorage.setItem('authToken', token);
    return { success: true, user: { ...newUser, password: undefined }, token };
  },

  async logout() {
    localStorage.removeItem('authToken');
    return { success: true };
  },

  async getCurrentUser() {
    await delay(MOCK_DELAY / 2);
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    const payload = parseToken(token);
    if (!payload || payload.exp < Date.now()) {
      localStorage.removeItem('authToken');
      return null;
    }
    
    const user = users.find(u => u.id === payload.userId);
    return user ? { ...user, password: undefined } : null;
  },

  // Travel Packages
  async getPackages(filters = {}) {
    await delay(MOCK_DELAY);
    let filteredPackages = [...travelPackages];
    
    if (filters.destination) {
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }
    
    if (filters.category) {
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.minPrice || filters.maxPrice) {
      filteredPackages = filteredPackages.filter(pkg => {
        if (filters.minPrice && pkg.price < filters.minPrice) return false;
        if (filters.maxPrice && pkg.price > filters.maxPrice) return false;
        return true;
      });
    }
    
    if (filters.duration) {
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.duration.includes(filters.duration)
      );
    }
    
    return filteredPackages;
  },

  async getPackageById(id) {
    await delay(MOCK_DELAY);
    const pkg = travelPackages.find(p => p.id === parseInt(id));
    return pkg || null;
  },

  async createPackage(packageData) {
    await delay(MOCK_DELAY);
    const newPackage = {
      id: Math.max(...travelPackages.map(p => p.id)) + 1,
      ...packageData,
      rating: 0,
      reviews: 0,
      availability: packageData.availability || 10
    };
    travelPackages.push(newPackage);
    return newPackage;
  },

  async updatePackage(id, packageData) {
    await delay(MOCK_DELAY);
    const index = travelPackages.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    
    travelPackages[index] = { ...travelPackages[index], ...packageData };
    return travelPackages[index];
  },

  async deletePackage(id) {
    await delay(MOCK_DELAY);
    const index = travelPackages.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    
    travelPackages.splice(index, 1);
    return true;
  },

  // Bookings
  async createBooking(bookingData) {
    await delay(MOCK_DELAY);
    const newBooking = {
      id: Math.max(...bookings.map(b => b.id), 0) + 1,
      ...bookingData,
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: new Date().toISOString().split('T')[0]
    };
    bookings.push(newBooking);
    return newBooking;
  },

  async getBookings(userId = null) {
    await delay(MOCK_DELAY);
    if (userId) {
      return bookings.filter(b => b.userId === userId);
    }
    return bookings;
  },

  async updateBookingStatus(id, status) {
    await delay(MOCK_DELAY);
    const booking = bookings.find(b => b.id === id);
    if (!booking) return null;
    
    booking.status = status;
    return booking;
  },

  // Users (Admin only)
  async getUsers() {
    await delay(MOCK_DELAY);
    return users.map(user => ({ ...user, password: undefined }));
  },

  // Search
  async searchPackages(query) {
    await delay(MOCK_DELAY);
    const searchTerm = query.toLowerCase();
    return travelPackages.filter(pkg => 
      pkg.title.toLowerCase().includes(searchTerm) ||
      pkg.destination.toLowerCase().includes(searchTerm) ||
      pkg.description.toLowerCase().includes(searchTerm)
    );
  }
};

export default mockApi;


