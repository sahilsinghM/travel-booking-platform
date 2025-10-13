import React from 'react';
import { motion } from 'framer-motion';

const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ocean-blue-500 focus:border-transparent transition-all duration-200 ${
    error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
  } ${className}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <motion.input
        whileFocus={{ scale: 1.02 }}
        className={inputClasses}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;


