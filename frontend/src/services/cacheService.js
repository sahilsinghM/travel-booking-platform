// Cache service for localStorage with TTL support
class CacheService {
  constructor() {
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes in milliseconds
  }

  // Set cache with TTL
  set(key, value, ttl = this.defaultTTL) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set cache:', error);
    }
  }

  // Get cache if not expired
  get(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      const now = Date.now();
      
      // Check if expired
      if (now - parsed.timestamp > parsed.ttl) {
        this.delete(key);
        return null;
      }

      return parsed.value;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  }

  // Delete cache
  delete(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to delete cache:', error);
    }
  }

  // Clear all cache
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  // Cache packages data
  setPackages(packages) {
    this.set('cache_packages', packages, 5 * 60 * 1000); // 5 minutes
  }

  getPackages() {
    return this.get('cache_packages');
  }

  // Cache user data
  setUser(user) {
    this.set('cache_user', user, 24 * 60 * 60 * 1000); // 24 hours
  }

  getUser() {
    return this.get('cache_user');
  }

  // Cache package details
  setPackageDetails(id, packageData) {
    this.set(`cache_package_${id}`, packageData, 10 * 60 * 1000); // 10 minutes
  }

  getPackageDetails(id) {
    return this.get(`cache_package_${id}`);
  }

  // Invalidate cache on mutations
  invalidatePackages() {
    this.delete('cache_packages');
    // Clear individual package caches
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_package_')) {
        localStorage.removeItem(key);
      }
    });
  }

  invalidateUser() {
    this.delete('cache_user');
  }
}

// Export singleton instance
const cacheService = new CacheService();
export default cacheService;
