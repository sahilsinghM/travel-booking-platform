import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiCalendar, FiStar, FiUsers, FiClock } from 'react-icons/fi';
import api from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency } from '../utils/helpers';
import { PackageGridSkeleton } from '../components/ui/PackageSkeleton';
import { HeroSkeleton, StatsSkeleton, TestimonialsSkeleton } from '../components/ui/HeroSkeleton';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSettings();
    loadFeaturedPackages();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const loadFeaturedPackages = async () => {
    try {
      setShowSkeleton(true);
      const packages = await api.getPackages();
      setFeaturedPackages(packages.slice(0, 4)); // Show first 4 packages
    } catch (error) {
      console.error('Failed to load packages:', error);
    } finally {
      setLoading(false);
      // Show skeleton for a minimum time for better UX
      setTimeout(() => setShowSkeleton(false), 1000);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular travel packages, carefully curated to provide you with unforgettable experiences.
            </p>
          </motion.div>

          {showSkeleton ? (
            <PackageGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
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
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/packages">
              <Button size="lg" variant="outline">
                View All Packages
              </Button>
            </Link>
          </motion.div>
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


