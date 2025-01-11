import axios, { InternalAxiosRequestConfig } from 'axios';
import { publicUrls } from '../urls/publicurls';
import { useRouter } from 'next/navigation';

const BaseUrl = "localhost:4000/api"
// Axios instance configuration
const AxiosInstance = axios.create({
  baseURL: BaseUrl, // Replace with your API base URL
  timeout: 5000, // Optional timeout for requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials:  true, // Ensure cookies are sent with requests
});

// Function to extract CSRF token from cookies
const getCsrfTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === 'csrf-token') {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Authorization Token retrieval function
const getAuthToken = (): string | null => {
  // Replace this logic with your application's method to retrieve the auth token
  return localStorage.getItem('access-token') || null;
};

// Request interceptor to add CSRF and Authorization tokens
AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const csrfToken = getCsrfTokenFromCookie();
    const authToken = getAuthToken();

    // Check if the URL is excluded
    const isExcluded = publicUrls.some((url) => config.url?.includes(url));

    if (!isExcluded) {
      if (csrfToken) {
        config.headers['x-csrf-token'] = csrfToken;
      }

      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
    }

    return config;
  },
  (error) => {
    const router = useRouter();
    router.push("/");
    return Promise.reject(error);
  }
);

// Response interceptor (optional for error handling or token refresh logic)
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors such as token expiration
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirect to login or refresh token.');
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;


