import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-16 w-16',
    xl: 'h-32 w-32'
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-b-2 border-ocean-blue-600 ${sizes[size]}`}></div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {spinner}
          <p className="mt-4 text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;


