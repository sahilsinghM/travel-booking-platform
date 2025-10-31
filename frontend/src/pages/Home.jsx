import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiCalendar, FiStar, FiUsers, FiClock, FiFilter, FiX, FiHeart } from 'react-icons/fi';
import api from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency } from '../utils/helpers';
import { PackageGridSkeleton } from '../components/ui/PackageSkeleton';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [settings, setSettings] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    destination: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState({});
  const packagesPerPage = 9;

  useEffect(() => {
    loadSettings();
    loadPackages();
  }, [filters]);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const loadPackages = async () => {
    try {
      setLoading(true);
      setShowSkeleton(true);
      const filterParams = {};
      
      if (filters.search) filterParams.search = filters.search;
      if (filters.destination) filterParams.destination = filters.destination;
      if (filters.category) filterParams.category = filters.category;
      if (filters.minPrice) filterParams.minPrice = parseInt(filters.minPrice);
      if (filters.maxPrice) filterParams.maxPrice = parseInt(filters.maxPrice);
      if (filters.duration) filterParams.duration = filters.duration;

      const allPackages = await api.getPackages(filterParams);
      setPackages(allPackages);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to load packages:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setShowSkeleton(false), 1000);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      destination: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      duration: ''
    });
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  };

  const handleImageError = (packageId) => {
    setImageErrors(prev => ({ ...prev, [packageId]: true }));
  };

  // Pagination
  const totalPages = Math.ceil(packages.length / packagesPerPage);
  const startIndex = (currentPage - 1) * packagesPerPage;
  const endIndex = startIndex + packagesPerPage;
  const currentPackages = packages.slice(startIndex, endIndex);

  const categories = ['Beach', 'Mountain', 'Cultural', 'Romantic', 'Adventure', 'Luxury'];
  const durations = ['3 days', '5 days', '7 days', '10 days', '12 days'];

  const testimonials = settings?.testimonials || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ocean-blue-600 via-ocean-blue-700 to-mint-green-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {settings?.homepage?.heroTitle || 'Discover Your Next Adventure'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100"
            >
              {settings?.homepage?.heroSubtitle || 'Explore breathtaking destinations, create unforgettable memories, and find the perfect travel package for your dream vacation.'}
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                  <Input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white/90 backdrop-blur-sm border-white/20 focus:bg-white"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-4 bg-mint-green-600 hover:bg-mint-green-700 shadow-lg"
                >
                  Search Packages
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Packages Section with Filters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel Packages
            </h2>
            <p className="text-lg text-gray-600">
              Discover amazing destinations and find your perfect travel experience
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <FiX size={20} />
                  </Button>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter destination..."
                      value={filters.destination}
                      onChange={(e) => handleFilterChange('destination', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={filters.duration}
                      onChange={(e) => handleFilterChange('duration', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Duration</option>
                      {durations.map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={clearFilters} className="flex-1">
                      Clear
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Packages List */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="w-full"
                >
                  <FiFilter className="mr-2" size={18} />
                  Show Filters
                </Button>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `${packages.length} packages found`}
                </p>
              </div>

              {/* Packages List */}
              {showSkeleton ? (
                <PackageGridSkeleton count={6} />
              ) : currentPackages.length > 0 ? (
                <div className="space-y-4">
                  {currentPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link to={`/packages/${pkg._id}`} className="block">
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer border border-gray-200">
                          {/* Mobile: Vertical Card Layout, Desktop/iPad: Horizontal List Layout */}
                          <div className="flex flex-col md:flex-row">
                            {/* Image Section */}
                            <div className="relative w-full md:w-64 flex-shrink-0 h-48 md:h-auto">
                              {imageErrors[pkg._id] ? (
                                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center">
                                  <FiMapPin className="text-gray-400 mb-2" size={32} />
                                  <span className="text-gray-500 text-xs">Image Unavailable</span>
                                </div>
                              ) : (
                                <img
                                  src={pkg.images[0]}
                                  alt={pkg.title}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(pkg._id)}
                                />
                              )}
                              <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs border-0">
                                {pkg.category}
                              </Badge>
                            </div>
                            
                            {/* Content Section */}
                            <div className="flex-1 p-4 flex flex-col justify-between">
                              {/* Main Info */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-ocean-blue-600 transition-colors">
                                    {pkg.title}
                                  </h3>
                                  <button 
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                  >
                                    <FiHeart size={18} className="text-gray-400 hover:text-red-500" />
                                  </button>
                                </div>
                                
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                  <FiMapPin size={14} className="mr-1.5" />
                                  <span>{pkg.destination}</span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 flex-wrap">
                                  <div className="flex items-center">
                                    <FiStar className="text-yellow-400 mr-1" size={14} />
                                    <span className="font-medium">{pkg.rating}</span>
                                    <span className="ml-1">({pkg.reviews} reviews)</span>
                                  </div>
                                  <div className="flex items-center">
                                    <FiClock size={14} className="mr-1" />
                                    <span>{pkg.duration}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <FiUsers size={14} className="mr-1" />
                                    <span>{pkg.groupSize}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Bottom Section - Pricing */}
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100 pt-3 mt-auto">
                                <div className="flex-1">
                                  {pkg.originalPrice ? (
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {formatCurrency(pkg.price)}
                                      </span>
                                      <span className="text-sm text-gray-500 line-through">
                                        {formatCurrency(pkg.originalPrice)}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                      {formatCurrency(pkg.price)}
                                    </span>
                                  )}
                                </div>
                                <Button variant="outline" className="w-full sm:w-auto">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <FiSearch size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No packages found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse all packages.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;
                      const showPage = page === 1 || page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      if (!showPage) {
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2 text-gray-400">...</span>;
                        }
                        return null;
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? 'default' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center justify-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-ocean-blue-600 to-mint-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of satisfied travelers who have discovered their dream destinations with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages">
                <Button size="lg" variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-ocean-blue-600 hover:border-white">
                  Browse Packages
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" className="bg-white text-ocean-blue-600 hover:bg-gray-100 shadow-lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;


