import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL;
const baseURL = (typeof rawBaseUrl === 'string' && rawBaseUrl.trim().length > 0)
  ? rawBaseUrl.trim()
  : '/api';

const api = axios.create({ baseURL });

export default api;
