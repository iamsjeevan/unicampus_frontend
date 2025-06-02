// src/lib/apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

// Helper to get token from localStorage (AuthContext will manage this)
const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

interface ApiClientOptions extends RequestInit {
  data?: any;
  isPublic?: boolean; // To bypass auth header for public routes
  isRefreshTokenRequest?: boolean; // Special flag for refresh token request
}

// Define a generic error structure your API might return
interface ApiError {
  status: string; // "fail" or "error"
  message: string;
  // Add other potential error fields
}

export interface PaginatedResponse<T> {
  status: string;
  results?: number; // If your API returns total results
  data: T[]; // Assuming data is always an array for paginated lists
  // Add other pagination fields if your API returns them (e.g., totalPages, currentPage)
}


async function apiClient<T>(
  endpoint: string,
  { data, headers: customHeaders, isPublic = false, isRefreshTokenRequest = false, ...customConfig }: ApiClientOptions = {}
): Promise<T> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET', // Default to POST if data is provided
    ...customConfig,
    headers: {
      ...(data && !(data instanceof FormData) && { 'Content-Type': 'application/json' }), // Don't set for FormData
      ...customHeaders,
    },
  };

  if (!isPublic) {
    const token = isRefreshTokenRequest ? localStorage.getItem('refreshToken') : getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    } else if (endpoint !== '/auth/login/student' && !endpoint.startsWith('/app/info')) {
      // For non-public routes (excluding login and app info), if no token, it's an issue.
      // AuthContext will handle redirect or state change.
      console.warn(`No auth token found for protected route: ${endpoint}`);
      // Throw an error or let AuthContext handle this by checking isAuthenticated
      return Promise.reject({ status: 401, message: 'Authentication token is missing.' });
    }
  }

  if (data) {
    if (data instanceof FormData) {
      config.body = data; // FormData handles its own content type
    } else {
      config.body = JSON.stringify(data);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Attempt to parse error JSON, otherwise use statusText
    let errorData: ApiError | { message: string };
    try {
      errorData = await response.json();
      if (typeof errorData !== 'object' || !('message' in errorData)) {
        // If the parsed JSON doesn't have a message, create one
        errorData = { message: response.statusText || 'Unknown error occurred' };
      }
    } catch (e) {
      errorData = { message: response.statusText || 'Failed to parse error response.' };
    }
    // Add status code to the rejected error object
    return Promise.reject({ httpStatus: response.status, ...errorData });
  }

  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    // For 204 No Content or empty responses, resolve with a success indicator or undefined.
    // Depending on T, you might want to cast or return a specific success object.
    return { status: 'success', message: 'Operation successful' } as unknown as T;
  }

  return response.json() as Promise<T>;
}

export default apiClient;