import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiDollarSign, FiFilter } from 'react-icons/fi';
import mockApi from '../../services/mockApi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/helpers';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await mockApi.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await mockApi.updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error('Failed to update booking status:', error);
      alert('Failed to update booking status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-mint-green-100 text-mint-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ocean-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all booking requests</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <FiFilter className="text-gray-400 mr-2" size={18} />
              <span className="text-sm font-medium text-gray-700 mr-4">Filter by status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-ocean-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Booking Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {booking.packageTitle}
                          </h3>
                          <p className="text-sm text-gray-600">Booking ID: #{booking.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <FiUser size={16} className="mr-2" />
                          <span>{booking.travelerDetails.firstName} {booking.travelerDetails.lastName}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiCalendar size={16} className="mr-2" />
                          <span>
                            {new Date(booking.travelDates.startDate).toLocaleDateString()} - {new Date(booking.travelDates.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiDollarSign size={16} className="mr-2" />
                          <span className="font-semibold">{formatCurrency(booking.totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{booking.travelerDetails.email}</p>
                        <p>{booking.travelerDetails.phone}</p>
                        <p className="text-xs text-gray-500 mt-2">Booked: {booking.bookingDate}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-center space-y-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        >
                          Cancel Booking
                        </Button>
                      )}
                      {booking.status === 'cancelled' && (
                        <span className="text-sm text-gray-500">Cancelled booking</span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <div className="text-center py-12">
                <p className="text-gray-500">No bookings found</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;


