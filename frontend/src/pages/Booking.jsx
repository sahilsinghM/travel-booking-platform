import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiMapPin, FiCalendar, FiUsers, FiCreditCard } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import mockApi from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/helpers';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { package: packageData, travelers, selectedDates } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    agreeToTerms: false
  });

  // Redirect if no package data
  if (!packageData) {
    navigate('/packages');
    return null;
  }

  const totalPrice = packageData.price * travelers;

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPaymentData({
      ...paymentData,
      [e.target.name]: value
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate traveler details
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitBooking = async () => {
    if (!paymentData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Create booking
      const booking = await api.createBooking({
        userId: user.id,
        packageId: packageData.id,
        packageTitle: packageData.title,
        travelerDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests
        },
        travelDates: {
          startDate: selectedDates.startDate,
          endDate: selectedDates.endDate
        },
        numberOfTravelers: travelers,
        totalAmount: totalPrice
      });

      setBookingId(booking.id);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Booking confirmation screen
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-blue-50 to-mint-green-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-mint-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-mint-green-600" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Booking Request Received!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for choosing TravelBooking
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">#{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{packageData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travel Dates:</span>
                  <span className="font-medium">
                    {new Date(selectedDates.startDate).toLocaleDateString()} - {new Date(selectedDates.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travelers:</span>
                  <span className="font-medium">{travelers}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">Total Amount:</span>
                  <span className="font-bold text-ocean-blue-600">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What's Next?</strong><br />
                Our travel specialists will review your booking request and get back to you within 24 hours via email at <strong>{formData.email}</strong> with payment instructions and further details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/')} variant="outline">
                Back to Home
              </Button>
              <Button onClick={() => navigate('/packages')}>
                Browse More Packages
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Traveler Details', icon: FiUsers },
    { id: 2, name: 'Review & Confirm', icon: FiCheck }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= step.id
                        ? 'bg-ocean-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon size={20} />
                  </div>
                  <span className="text-sm font-medium mt-2 text-gray-700">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      currentStep > step.id ? 'bg-ocean-blue-600' : 'bg-gray-200'
                    }`}
                    style={{ marginBottom: '2rem' }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              {/* Step 1: Traveler Details */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Traveler Details</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleFormChange}
                        rows="4"
                        placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={handleNextStep} size="lg">
                      Continue to Review
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Review & Confirm */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Traveler Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                        <p><span className="text-gray-600">Phone:</span> {formData.phone}</p>
                        {formData.specialRequests && (
                          <p><span className="text-gray-600">Special Requests:</span> {formData.specialRequests}</p>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-blue-800">
                          <FiCreditCard className="inline mr-2" size={16} />
                          Payment instructions will be sent to your email after we confirm your booking request.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name (as it appears on card)
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={paymentData.cardName}
                            onChange={handlePaymentChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={paymentData.agreeToTerms}
                            onChange={handlePaymentChange}
                            className="mt-1 mr-3"
                          />
                          <label className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-ocean-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-ocean-blue-600 hover:underline">Cancellation Policy</a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button onClick={handlePreviousStep} variant="outline" size="lg">
                      Back
                    </Button>
                    <Button 
                      onClick={handleSubmitBooking} 
                      loading={loading}
                      disabled={!paymentData.agreeToTerms}
                      size="lg"
                    >
                      Submit Booking Request
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="mb-4">
                  <img
                    src={packageData.images[0]}
                    alt={packageData.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-gray-900">{packageData.title}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <FiMapPin size={14} className="mr-1" />
                    {packageData.destination}
                  </div>
                </div>

                <div className="space-y-3 py-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar size={14} className="mr-2" />
                    <span>
                      {new Date(selectedDates.startDate).toLocaleDateString()} - {new Date(selectedDates.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiUsers size={14} className="mr-2" />
                    <span>{travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-medium">{formatCurrency(packageData.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Number of travelers</span>
                    <span className="font-medium">{travelers}</span>
                  </div>
                  {packageData.originalPrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-mint-green-600">Savings</span>
                      <span className="font-medium text-mint-green-600">
                        -{formatCurrency((packageData.originalPrice - packageData.price) * travelers)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-ocean-blue-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;


