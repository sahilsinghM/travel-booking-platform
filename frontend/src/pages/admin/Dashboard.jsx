import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiDollarSign, FiUsers, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import mockApi from '../../services/mockApi';
import Card from '../../components/ui/Card';
import { formatCurrency } from '../../utils/helpers';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [packages, bookings, users] = await Promise.all([
        mockApi.getPackages(),
        mockApi.getBookings(),
        mockApi.getUsers()
      ]);

      const totalRevenue = bookings.reduce((sum, booking) => {
        return sum + (booking.status === 'confirmed' ? booking.totalAmount : 0);
      }, 0);

      setStats({
        totalPackages: packages.length,
        totalBookings: bookings.length,
        totalRevenue,
        totalUsers: users.length
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      icon: FiPackage,
      color: 'ocean-blue',
      link: '/admin/packages'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: FiCalendar,
      color: 'mint-green',
      link: '/admin/bookings'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: FiDollarSign,
      color: 'sand',
      link: '/admin/bookings'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'ocean-blue',
      link: '/admin/users'
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your travel business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                      <stat.icon className={`text-${stat.color}-600`} size={24} />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                <Link to="/admin/bookings" className="text-ocean-blue-600 hover:text-ocean-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{booking.packageTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.travelerDetails.firstName} {booking.travelerDetails.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{booking.bookingDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(booking.totalAmount)}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No bookings yet</p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link
                  to="/admin/packages/new"
                  className="block w-full px-4 py-3 bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add New Package
                </Link>
                <Link
                  to="/admin/packages"
                  className="block w-full px-4 py-3 bg-white border-2 border-ocean-blue-600 text-ocean-blue-600 hover:bg-ocean-blue-50 rounded-lg font-medium transition-colors"
                >
                  Manage Packages
                </Link>
                <Link
                  to="/admin/bookings"
                  className="block w-full px-4 py-3 bg-white border-2 border-mint-green-600 text-mint-green-600 hover:bg-mint-green-50 rounded-lg font-medium transition-colors"
                >
                  View All Bookings
                </Link>
                <Link
                  to="/admin/users"
                  className="block w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Manage Users
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


