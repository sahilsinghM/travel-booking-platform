import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiUsers, FiClock, FiCalendar, FiCheck, FiX, FiArrowLeft, FiShare2, FiHeart } from 'react-icons/fi';
import api from '../services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    loadPackageDetails();
  }, [id]);

  const loadPackageDetails = async () => {
    try {
      setLoading(true);
      setShowSkeleton(true);
      const pkg = await api.getPackageById(id);
      if (pkg) {
        setPackageData(pkg);
        // Set default end date based on duration
        const duration = parseInt(pkg.duration);
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + duration);
        
        setSelectedDates({
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        });
      } else {
        navigate('/packages');
      }
    } catch (error) {
      console.error('Failed to load package details:', error);
      navigate('/packages');
    } finally {
      setLoading(false);
      // Show skeleton for a minimum time for better UX
      setTimeout(() => setShowSkeleton(false), 1000);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: { pathname: `/packages/${id}` } } });
      return;
    }
    
    // Navigate to booking page with package data
    navigate('/booking', { 
      state: { 
        package: packageData,
        travelers,
        selectedDates
      } 
    });
  };

  const handleDateChange = (type, value) => {
    setSelectedDates(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ocean-blue-600"></div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h2>
          <Link to="/packages">
            <Button>Back to Packages</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = packageData.price * travelers;
  const savings = packageData.originalPrice ? (packageData.originalPrice - packageData.price) * travelers : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <FiArrowLeft className="mr-2" size={18} />
            Back
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={packageData.images[selectedImage]}
                    alt={packageData.title}
                    className="w-full h-96 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-ocean-blue-600 text-white hover:bg-ocean-blue-700">
                    {packageData.category}
                  </Badge>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                      <FiShare2 size={18} />
                    </Button>
                    <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                      <FiHeart size={18} />
                    </Button>
                  </div>
                </div>
                
                {/* Thumbnail Images */}
                <CardContent className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {packageData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-ocean-blue-600' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${packageData.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Package Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {packageData.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin size={18} className="mr-2" />
                    <span>{packageData.destination}</span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 mr-1" size={16} />
                      <span>{packageData.rating} ({packageData.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers size={16} className="mr-2" />
                      <span>{packageData.groupSize}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock size={16} className="mr-2" />
                      <span>{packageData.difficulty}</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {packageData.description}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="itinerary" className="mt-6">
                    <div className="space-y-4">
                      {packageData.itinerary.map((day, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-ocean-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700">{day}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <FiCheck className="text-mint-green-600 mr-2" size={20} />
                          What's Included
                        </h3>
                        <ul className="space-y-2">
                          {packageData.inclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <FiCheck className="text-mint-green-600 mr-2 mt-1 flex-shrink-0" size={16} />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <FiX className="text-red-600 mr-2" size={20} />
                          Not Included
                        </h3>
                        <ul className="space-y-2">
                          {packageData.exclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <FiX className="text-red-600 mr-2 mt-1 flex-shrink-0" size={16} />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-ocean-blue-600">
                      {formatCurrency(packageData.price)}
                    </span>
                    {packageData.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatCurrency(packageData.originalPrice)}
                      </span>
                    )}
                  </div>
                  {packageData.originalPrice && (
                    <p className="text-sm text-mint-green-600 font-medium">
                      Save {formatCurrency(packageData.originalPrice - packageData.price)} per person
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  {/* Travel Dates */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Dates
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={selectedDates.startDate}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="date"
                        value={selectedDates.endDate}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Number of Travelers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Travelers
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-2">{travelers}</span>
                      <button
                        onClick={() => setTravelers(Math.min(12, travelers + 1))}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-medium">{formatCurrency(packageData.price)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Travelers</span>
                    <span className="font-medium">{travelers}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-mint-green-600">Savings</span>
                      <span className="font-medium text-mint-green-600">-{formatCurrency(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-ocean-blue-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBookNow}
                  className="w-full mb-4"
                  size="lg"
                >
                  Book Now
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    <FiCalendar className="inline mr-1" size={14} />
                    Free cancellation up to 24 hours before travel
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;


