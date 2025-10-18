import axios from 'axios';

// Base URL and credentials
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// Interceptor to include XSRF-TOKEN
axios.interceptors.request.use((config) => {
  const token = getCookieValue('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

function getCookieValue(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

export default axios;
