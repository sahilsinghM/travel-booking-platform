// Real API service for backend integration
import cacheService from './cacheService';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://travel-booking-platform-2i9o.onrender.com/api'
  : 'http://localhost:5000/api';

// Request deduplication
const pendingRequests = new Map();

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Utility function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Deduplication helper
const deduplicateRequest = async (key, requestFn) => {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  const promise = requestFn();
  pendingRequests.set(key, promise);

  try {
    const result = await promise;
    return result;
  } finally {
    pendingRequests.delete(key);
  }
};

// API service object
const api = {
  // Authentication
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await handleResponse(response);
    
    if (data.success) {
      localStorage.setItem('authToken', data.token);
      return { success: true, user: data.user, token: data.token };
    }
    
    return { success: false, message: data.message };
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await handleResponse(response);
    
    if (data.success) {
      localStorage.setItem('authToken', data.token);
      return { success: true, user: data.user, token: data.token };
    }
    
    return { success: false, message: data.message };
  },

  async logout() {
    localStorage.removeItem('authToken');
    return { success: true };
  },

  async getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      
      const data = await handleResponse(response);
      return data.success ? data.user : null;
    } catch (error) {
      localStorage.removeItem('authToken');
      return null;
    }
  },

  // Travel Packages
  async getPackages(filters = {}) {
    const cacheKey = `packages_${JSON.stringify(filters)}`;
    
    // Check cache first
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Make API request with deduplication
    const packages = await deduplicateRequest(cacheKey, async () => {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });
      
      const url = `${API_BASE_URL}/packages${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await fetch(url);
      const data = await handleResponse(response);
      
      return data.data || [];
    });

    // Cache the result
    cacheService.set(cacheKey, packages, 5 * 60 * 1000); // 5 minutes
    
    return packages;
  },

  async getPackageById(id) {
    // Check cache first
    const cachedData = cacheService.getPackageDetails(id);
    if (cachedData) {
      return cachedData;
    }

    // Make API request
    const response = await fetch(`${API_BASE_URL}/packages/${id}`);
    const data = await handleResponse(response);
    const packageData = data.data || null;
    
    // Cache the result
    if (packageData) {
      cacheService.setPackageDetails(id, packageData);
    }
    
    return packageData;
  },

  async createPackage(packageData) {
    const response = await fetch(`${API_BASE_URL}/packages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(packageData)
    });
    
    const data = await handleResponse(response);
    
    // Invalidate cache after creating package
    cacheService.invalidatePackages();
    
    return data.data;
  },

  async updatePackage(id, packageData) {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(packageData)
    });
    
    const data = await handleResponse(response);
    
    // Invalidate cache after updating package
    cacheService.invalidatePackages();
    cacheService.delete(`cache_package_${id}`);
    
    return data.data;
  },

  async deletePackage(id) {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    // Invalidate cache after deleting package
    cacheService.invalidatePackages();
    cacheService.delete(`cache_package_${id}`);
    
    return response.ok;
  },

  // Bookings
  async createBooking(bookingData) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
    
    const data = await handleResponse(response);
    return data.data;
  },

  async getBookings(userId = null) {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: getAuthHeaders()
    });
    
    const data = await handleResponse(response);
    return data.data || [];
  },

  async updateBookingStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(status)
    });
    
    const data = await handleResponse(response);
    return data.data;
  },

  // Users (Admin only)
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders()
    });
    
    const data = await handleResponse(response);
    return data.data || [];
  },

  // Search
  async searchPackages(query) {
    const response = await fetch(`${API_BASE_URL}/packages/search?q=${encodeURIComponent(query)}`);
    const data = await handleResponse(response);
    
    return data.data || [];
  }
};

export default api;
