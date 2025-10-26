// In-memory cache middleware for backend responses
class CacheMiddleware {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes
  }

  // Generate cache key from request
  generateKey(req) {
    const url = req.originalUrl || req.url;
    const method = req.method;
    const query = JSON.stringify(req.query || {});
    return `${method}:${url}:${query}`;
  }

  // Check if cache entry is valid
  isValid(entry) {
    if (!entry) return false;
    const now = Date.now();
    return now - entry.timestamp < entry.ttl;
  }

  // Get cached response
  get(req) {
    const key = this.generateKey(req);
    const entry = this.cache.get(key);
    
    if (this.isValid(entry)) {
      console.log(`Cache hit for ${key}`);
      return entry.data;
    }
    
    if (entry) {
      this.cache.delete(key);
    }
    
    return null;
  }

  // Set cached response
  set(req, data, ttl = this.defaultTTL) {
    const key = this.generateKey(req);
    const entry = {
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      timestamp: Date.now(),
      ttl
    };
    
    this.cache.set(key, entry);
    console.log(`Cache set for ${key}`);
  }

  // Clear cache by pattern
  clear(pattern) {
    const keysToDelete = [];
    
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    }
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
      console.log(`Cache cleared for ${key}`);
    });
  }

  // Clear all cache
  clearAll() {
    this.cache.clear();
    console.log('All cache cleared');
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
const cacheMiddleware = new CacheMiddleware();

// Express middleware function
const cache = (ttl) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Check cache
    const cachedData = cacheMiddleware.get(req);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Store original res.json
    const originalJson = res.json;
    
    // Override res.json to cache response
    res.json = function(data) {
      // Cache the response
      cacheMiddleware.set(req, data, ttl);
      
      // Call original json method
      return originalJson.call(this, data);
    };

    next();
  };
};

// Cache invalidation helper
const invalidateCache = (pattern) => {
  cacheMiddleware.clear(pattern);
};

module.exports = {
  cache,
  invalidateCache,
  cacheMiddleware
};
