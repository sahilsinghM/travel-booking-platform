const indianPackages = [
  {
    title: "Goa Beach Paradise",
    destination: "Goa, India",
    duration: "5 days",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 1247,
    images: [
      "https://images.unsplash.com/photo-1527004013197-933c9bb60280?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800"
    ],
    description: "Experience the vibrant beaches, Portuguese heritage, and tropical paradise of Goa with pristine coastlines and exciting water sports.",
    itinerary: [
      "Day 1: Arrival in Goa, check-in to beach resort",
      "Day 2: Explore North Goa beaches - Calangute, Baga",
      "Day 3: Visit Old Goa churches and Portuguese heritage",
      "Day 4: South Goa beaches - Palolem, Colva",
      "Day 5: Water sports and departure"
    ],
    inclusions: [
      "4 nights accommodation in beach resort",
      "Daily breakfast",
      "Airport transfers",
      "Beach hopping tour",
      "Water sports activities",
      "Heritage walk in Old Goa"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Beach",
    difficulty: "Easy",
    groupSize: "2-8 people",
    bestTime: "November - March",
    availability: 15
  },
  {
    title: "Himachal Mountain Trek",
    destination: "Manali, Himachal Pradesh",
    duration: "7 days",
    price: 35000,
    originalPrice: 40000,
    rating: 4.9,
    reviews: 892,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759844-d150baecf7b2?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ],
    description: "Discover the breathtaking beauty of the Himalayas with snow-capped peaks, mountain villages, and thrilling trekking trails.",
    itinerary: [
      "Day 1: Arrival in Manali, acclimatization",
      "Day 2: Local sightseeing - Hadimba Temple, Vashisht",
      "Day 3: Trek to Solang Valley",
      "Day 4: Rohtang Pass excursion",
      "Day 5: Trek to Beas Kund",
      "Day 6: Explore Old Manali",
      "Day 7: Departure"
    ],
    inclusions: [
      "6 nights accommodation in mountain resort",
      "Daily breakfast and dinner",
      "Airport transfers",
      "Trekking equipment",
      "Professional guide",
      "Permits and entry fees"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch",
      "Personal trekking gear",
      "Optional activities"
    ],
    category: "Mountain",
    difficulty: "Moderate",
    groupSize: "2-6 people",
    bestTime: "May - October",
    availability: 8
  },
  {
    title: "Kerala Backwaters",
    destination: "Kerala, India",
    duration: "6 days",
    price: 30000,
    originalPrice: 35000,
    rating: 4.7,
    reviews: 1563,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800"
    ],
    description: "Immerse yourself in God's Own Country with serene backwaters, lush greenery, traditional houseboats, and authentic Kerala cuisine.",
    itinerary: [
      "Day 1: Arrival in Kochi, city tour",
      "Day 2: Alleppey backwater cruise",
      "Day 3: Munnar hill station",
      "Day 4: Tea plantation tour",
      "Day 5: Kumarakom bird sanctuary",
      "Day 6: Departure"
    ],
    inclusions: [
      "5 nights accommodation",
      "Daily breakfast",
      "Houseboat cruise",
      "Airport transfers",
      "Tea plantation visit",
      "Cultural show"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Cultural",
    difficulty: "Easy",
    groupSize: "2-10 people",
    bestTime: "October - March",
    availability: 12
  },
  {
    title: "Rajasthan Heritage Tour",
    destination: "Rajasthan, India",
    duration: "8 days",
    price: 40000,
    originalPrice: 45000,
    rating: 4.9,
    reviews: 743,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800"
    ],
    description: "Experience the royal heritage of Rajasthan with magnificent palaces, desert safaris, and vibrant cultural experiences.",
    itinerary: [
      "Day 1: Arrival in Jaipur, city tour",
      "Day 2: Amber Fort and City Palace",
      "Day 3: Drive to Jodhpur",
      "Day 4: Mehrangarh Fort and blue city",
      "Day 5: Drive to Jaisalmer",
      "Day 6: Desert safari and camping",
      "Day 7: Golden Fort exploration",
      "Day 8: Departure"
    ],
    inclusions: [
      "7 nights accommodation in heritage hotels",
      "Daily breakfast",
      "Airport transfers",
      "Desert safari with dinner",
      "Fort entry fees",
      "Cultural performances"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Heritage",
    difficulty: "Easy",
    groupSize: "2-8 people",
    bestTime: "October - March",
    availability: 10
  },
  {
    title: "Ladakh Adventure",
    destination: "Ladakh, India",
    duration: "10 days",
    price: 50000,
    originalPrice: 55000,
    rating: 4.8,
    reviews: 456,
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
      "https://images.unsplash.com/photo-1587595431973-160d1d94c735?w=800",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800"
    ],
    description: "Embark on an unforgettable journey to the Land of High Passes with stunning landscapes, Buddhist monasteries, and high-altitude adventures.",
    itinerary: [
      "Day 1: Arrival in Leh, acclimatization",
      "Day 2: Local sightseeing - Leh Palace",
      "Day 3: Drive to Nubra Valley",
      "Day 4: Camel safari and sand dunes",
      "Day 5: Return to Leh",
      "Day 6: Pangong Lake excursion",
      "Day 7: Monasteries tour",
      "Day 8: Khardung La Pass",
      "Day 9: Free day in Leh",
      "Day 10: Departure"
    ],
    inclusions: [
      "9 nights accommodation",
      "Daily breakfast and dinner",
      "Airport transfers",
      "Inner line permits",
      "Professional guide",
      "Monastery entry fees"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch",
      "Personal gear",
      "Optional activities"
    ],
    category: "Adventure",
    difficulty: "Challenging",
    groupSize: "2-6 people",
    bestTime: "May - September",
    availability: 6
  },
  {
    title: "Andaman Islands",
    destination: "Andaman & Nicobar Islands",
    duration: "6 days",
    price: 45000,
    originalPrice: 50000,
    rating: 4.6,
    reviews: 1123,
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    description: "Discover the pristine beauty of Andaman Islands with crystal-clear waters, coral reefs, and untouched beaches.",
    itinerary: [
      "Day 1: Arrival in Port Blair",
      "Day 2: Cellular Jail and Ross Island",
      "Day 3: Ferry to Havelock Island",
      "Day 4: Radhanagar Beach and water sports",
      "Day 5: Neil Island exploration",
      "Day 6: Departure"
    ],
    inclusions: [
      "5 nights accommodation",
      "Daily breakfast",
      "Ferry transfers",
      "Airport transfers",
      "Snorkeling equipment",
      "Island hopping"
    ],
    exclusions: [
      "Flight tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities"
    ],
    category: "Beach",
    difficulty: "Easy",
    groupSize: "2-8 people",
    bestTime: "October - May",
    availability: 8
  }
];

module.exports = indianPackages;
