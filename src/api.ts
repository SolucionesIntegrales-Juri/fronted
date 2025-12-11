import axios from 'axios';

// Crear instancia de Axios con la URL base del API Gateway
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
