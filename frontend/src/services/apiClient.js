import axios from 'axios';

// Set this to your backend host while developing on devices/emulators.
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 10000
});

export default apiClient;
