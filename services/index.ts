// BASE SERVICE (UNDER THE HOOD FOR FETCH REQUESTS)
interface ApiServiceConfig extends RequestInit {
  headers?: HeadersInit;
}

interface RequestOptions extends ApiServiceConfig {}

class ApiService {
  private baseURL: string;
  private config: ApiServiceConfig;

  constructor(baseURL: string, config: ApiServiceConfig = {}) {
    this.baseURL = baseURL;
    this.config = config;
  }

  async request<T>(
    endpoint: string,
    method: string = 'GET',
    data: any = null,
    options: RequestOptions = {}
  ): Promise<T> {
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.config?.headers, // Use headers from instance config
        ...options?.headers,    // Override headers with options if provided
      },
      ...this.config,          // Use other instance config options
      ...options,              // Override other options with provided options
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, requestOptions);
      return this.handleResponse<T>(response);
    } catch (error: Error | unknown | any) {
      this.handleError(error);
      throw error;
    }
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'GET', null, options);
  }

  async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, options);
  }

  async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, options);
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', null, options);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'API request failed',
      }));
      throw new Error(error.message);
    }

    try {
      return await response.json();
    } catch (jsonError) {
      throw new Error('Error while parsing JSON response');
    }
  }

  private handleError(error: Error): void {
    console.error('API Error:', error.message);
  }
}

export default ApiService;
