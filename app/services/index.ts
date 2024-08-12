class ApiService {
  constructor(baseURL, config = {}) {
    this.baseURL = baseURL;
    this.config = config;
  }

  async request(endpoint, method = 'GET', data = null, options = {}) {
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers, // Use headers from instance config
        ...options.headers,    // Override headers with options if provided
      },
      ...this.config,          // Use other instance config options
      ...options,              // Override other options with provided options
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, requestOptions);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw the error to allow handling in calling code
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, 'GET', null, options);
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, 'POST', data, options);
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, 'PUT', data, options);
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, 'DELETE', null, options);
  }

  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'API request failed',
      }));
      throw new Error(error.message);
    }

    try {
      return await response.json();
    } catch (jsonError) {
      throw new Error('Error parsing JSON response');
    }
  }

  handleError(error) {
    console.error('API Error:', error.message);
  };
}

export default ApiService;
