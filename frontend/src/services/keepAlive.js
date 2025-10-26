// Keep-alive service to prevent backend cold starts
class KeepAliveService {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
    this.pingInterval = 10 * 60 * 1000; // 10 minutes
    this.apiBaseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://travel-booking-platform-2i9o.onrender.com/api'
      : 'http://localhost:5000/api';
  }

  // Start keep-alive pings
  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    console.log('Keep-alive service started');
    
    // Ping immediately
    this.ping();
    
    // Set up interval
    this.intervalId = setInterval(() => {
      this.ping();
    }, this.pingInterval);
  }

  // Stop keep-alive pings
  stop() {
    if (!this.isActive) return;
    
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('Keep-alive service stopped');
  }

  // Ping the backend health endpoint
  async ping() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Keep-alive ping successful');
      } else {
        console.warn('Keep-alive ping failed:', response.status);
      }
    } catch (error) {
      console.warn('Keep-alive ping error:', error.message);
    }
  }

  // Manual ping (for testing)
  async manualPing() {
    await this.ping();
  }

  // Get service status
  getStatus() {
    return {
      isActive: this.isActive,
      pingInterval: this.pingInterval,
      nextPing: this.isActive ? this.pingInterval : null
    };
  }
}

// Export singleton instance
const keepAliveService = new KeepAliveService();
export default keepAliveService;
