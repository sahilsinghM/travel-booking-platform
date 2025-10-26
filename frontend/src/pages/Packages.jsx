import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiStar, FiUsers, FiClock, FiFilter, FiX } from 'react-icons/fi';
import api from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PackageGridSkeleton } from '../components/ui/PackageSkeleton';
import { formatCurrency } from '../utils/helpers';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
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
  const packagesPerPage = 9;

  useEffect(() => {
    loadPackages();
  }, [filters]);

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
      // Show skeleton for a minimum time for better UX
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
    loadPackages();
  };

  // Pagination
  const totalPages = Math.ceil(packages.length / packagesPerPage);
  const startIndex = (currentPage - 1) * packagesPerPage;
  const endIndex = startIndex + packagesPerPage;
  const currentPackages = packages.slice(startIndex, endIndex);

  const categories = ['Beach', 'Mountain', 'Cultural', 'Romantic', 'Adventure', 'Luxury'];
  const durations = ['3 days', '5 days', '7 days', '10 days', '12 days'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Travel Packages
          </h1>
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

              <form onSubmit={handleSearch} className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
                    <Input
                      type="text"
                      placeholder="Search destinations..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Destination */}
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

                {/* Category */}
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

                {/* Price Range */}
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

                {/* Duration */}
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
                  <Button type="submit" className="flex-1">
                    Apply Filters
                  </Button>
                  <Button type="button" variant="outline" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Packages Grid */}
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
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent">
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {/* Packages Grid */}
            {showSkeleton ? (
              <PackageGridSkeleton count={6} />
            ) : currentPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/packages/${pkg._id}`} className="block h-full">
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                        <div className="relative">
                          <img
                            src={pkg.images[0]}
                            alt={pkg.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 hover:bg-white">
                            {pkg.duration}
                          </Badge>
                          <Badge variant="secondary" className="absolute top-4 left-4 bg-black/50 text-white hover:bg-black/70">
                            {pkg.category}
                          </Badge>
                        </div>
                        
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                              {pkg.title}
                            </h3>
                            <div className="flex items-center">
                              <FiStar className="text-yellow-400 mr-1" size={16} />
                              <span className="text-sm text-gray-600">{pkg.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <FiMapPin size={16} className="mr-2" />
                            <span className="text-sm">{pkg.destination}</span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-gray-600">
                              <FiUsers size={16} className="mr-2" />
                              <span className="text-sm">{pkg.groupSize}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <FiClock size={16} className="mr-2" />
                              <span className="text-sm">{pkg.difficulty}</span>
                            </div>
                          </div>
                          
                          <div className="mb-4 flex-grow">
                            <div className="mb-2">
                              <span className="text-3xl font-bold text-ocean-blue-600">
                                {formatCurrency(pkg.price)}
                              </span>
                              {pkg.originalPrice && (
                                <div className="flex items-center mt-1">
                                  <span className="text-base text-gray-500 line-through mr-2">
                                    {formatCurrency(pkg.originalPrice)}
                                  </span>
                                  <Badge variant="destructive" className="text-xs">
                                    Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 flex items-center">
                              <FiStar className="text-yellow-400 mr-1" size={14} />
                              {pkg.rating} rating • {pkg.reviews} reviews
                            </p>
                          </div>
                          
                          <div className="mt-auto">
                            <Button className="w-full">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
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
                        variant={isCurrentPage ? 'primary' : 'outline'}
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
    </div>
  );
};

export default Packages;


