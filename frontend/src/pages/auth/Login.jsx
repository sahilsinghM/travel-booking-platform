import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear validation error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-blue-50 to-mint-green-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10"
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-3">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-600 text-lg">
            Or{' '}
            <Link
              to="/signup"
              className="font-medium text-ocean-blue-600 hover:text-ocean-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none relative block w-full px-4 py-4 border ${
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue-500 focus:border-ocean-blue-500`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" size={16} />
                {validationErrors.email}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`appearance-none relative block w-full px-4 py-4 border ${
                validationErrors.password ? 'border-red-500' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-blue-500 focus:border-ocean-blue-500`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {validationErrors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" size={16} />
                {validationErrors.password}
              </p>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border-2 border-red-300 text-red-700 px-5 py-4 rounded-lg flex items-start space-x-3"
            >
              <FiAlertCircle className="flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-base mb-1">Login Failed</p>
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-ocean-blue-600 hover:bg-ocean-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
