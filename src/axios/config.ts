import axios, { InternalAxiosRequestConfig } from "axios";
import { publicUrls } from "../urls/publicurls";


let accessToken: string | null = null;
const BaseUrl = "localhost:4000/api";
export const setAccessToken = (token: string) => {
  accessToken = token;
};

// Axios instance configuration
const AxiosInstance = axios.create({
  baseURL: BaseUrl, // Replace with your API base URL
  timeout: 5000, // Optional timeout for requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// Function to extract CSRF token from cookies
const getCsrfTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === "csrftoken") {
      return decodeURIComponent(value);
    }
  }
  return null;
};


// Request interceptor to add CSRF and Authorization tokens
AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const csrfToken = getCsrfTokenFromCookie();

    // Check if the URL is excluded
    const isExcluded = publicUrls.some((url) => config.url?.includes(url));

    if (!isExcluded) {
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }
    if(accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional for error handling or token refresh logic)
// Response interceptor: Try refresh token on 401
AxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry // avoid infinite loop
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${BaseUrl}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest); // Retry original request
      } catch (refreshErr) {
        console.error('Refresh token failed', refreshErr);
        // maybe redirect to login page here
      }
    }

    return Promise.reject(err);
  }
);

export default AxiosInstance;
