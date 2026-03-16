import axios from 'axios';

/**
 * For physical devices, set EXPO_PUBLIC_API_BASE_URL in `frontend/.env`.
 * Example: EXPO_PUBLIC_API_BASE_URL=http://192.168.1.25:4000/api
 */
const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL,
  timeout: 10000
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Unexpected API error';

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
