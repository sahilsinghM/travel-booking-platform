import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/helpers';

// Package Edit Form Component
const PackageEditForm = ({ package: pkg, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...pkg });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addImage = (url) => {
    if (url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), url.trim()]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleNewImageUrlChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addImage(e.target.value);
      e.target.value = '';
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          addImage(reader.result); // Add as base64 data URL
        };
        reader.readAsDataURL(file);
      }
    });
    // Reset input
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert string fields to appropriate types
    const updatedPackage = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      availability: parseInt(formData.availability)
    };
    onSave(updatedPackage);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
            required
          >
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="Cultural">Cultural</option>
            <option value="Adventure">Adventure</option>
            <option value="Heritage">Heritage</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <input
            type="number"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500"
          required
        />
      </div>

      {/* Images Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Package Images</label>
        
        {/* Current Images */}
        {formData.images && formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <FiX size={16} />
                </button>
                <input
                  type="text"
                  value={img}
                  onChange={(e) => handleArrayChange(e, 'images', index)}
                  className="mt-2 w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-ocean-blue-500"
                  placeholder="Image URL"
                />
              </div>
            ))}
          </div>
        )}

        {/* Add New Image */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter image URL and press Enter to add"
              onKeyDown={handleNewImageUrlChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-blue-500 text-sm"
            />
            <button
              type="button"
              onClick={(e) => {
                const input = e.target.previousElementSibling;
                if (input) {
                  addImage(input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-2 bg-ocean-blue-600 text-white rounded-md hover:bg-ocean-blue-700 focus:outline-none focus:ring-2 focus:ring-ocean-blue-500 text-sm"
            >
              Add URL
            </button>
          </div>
          
          {/* File Upload */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Or upload images from your device:</p>
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-input"
              />
              <div className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-ocean-blue-400 rounded-lg bg-ocean-blue-50 hover:bg-ocean-blue-100 transition-all cursor-pointer">
                <svg className="w-12 h-12 mb-3 text-ocean-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 13L16 13l-3 3m-5-8l-3-3 3-3" />
                </svg>
                <p className="text-sm font-medium text-ocean-blue-700 mb-1">Click to upload images</p>
                <p className="text-xs text-ocean-blue-600">or drag and drop (PNG, JPG, GIF up to 10MB each)</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const data = await api.getPackages();
      setPackages(data);
    } catch (error) {
      console.error('Failed to load packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedPackage) => {
    try {
      await api.updatePackage(updatedPackage._id, updatedPackage);
      setPackages(packages.map(pkg => 
        pkg._id === updatedPackage._id ? updatedPackage : pkg
      ));
      setEditingPackage(null);
    } catch (error) {
      console.error('Failed to update package:', error);
      alert('Failed to update package');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deletePackage(id);
      setPackages(packages.filter(pkg => pkg._id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete package:', error);
      alert('Failed to delete package');
    }
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Packages</h1>
            <p className="text-gray-600">Create, edit, and manage your travel packages</p>
          </div>
          <Link to="/admin/packages/new">
            <Button className="flex items-center">
              <FiPlus className="mr-2" size={18} />
              Add New Package
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-0 focus:ring-2 focus:ring-ocean-blue-500 rounded-lg"
            />
          </div>
        </Card>

        {/* Packages Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPackages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={pkg.images[0]}
                          alt={pkg.title}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                          <div className="text-sm text-gray-500">{pkg.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(pkg.price)}</div>
                      {pkg.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{formatCurrency(pkg.originalPrice)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pkg.availability > 5 ? 'bg-mint-green-100 text-mint-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pkg.availability} spots
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingPackage(pkg)}
                        className="text-ocean-blue-600 hover:text-ocean-blue-900 mr-4"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(pkg._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages found</p>
            </div>
          )}
        </Card>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this package? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => handleDelete(showDeleteConfirm)}>
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Package Modal */}
        {editingPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Package</h3>
              
              <PackageEditForm
                package={editingPackage}
                onSave={(updatedPackage) => {
                  handleUpdate(updatedPackage);
                }}
                onCancel={() => setEditingPackage(null)}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePackages;


