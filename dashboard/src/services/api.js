import axios from 'axios';

const API_BASE_URL = 'https://ziadmohamed-upb2d9vu.b4a.run/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post('/user/login', { email, password }),
  register: (name, email, password) => api.post('/user/register', { name, email, password }),
  logout: () => api.get('/user/logout'),
};

// Product APIs
export const productAPI = {
  getAll: () => api.get('/product'),
  getById: (id) => api.get(`/product/${id}`),
  create: (formData) => api.post('/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => api.put(`/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/product/${id}`),
};

// Skill APIs
export const skillAPI = {
  getAll: () => api.get('/skill'),
  getById: (id) => api.get(`/skill/${id}`),
  create: (formData) => api.post('/skill', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => api.put(`/skill/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/skill/${id}`),
};

// About APIs
export const aboutAPI = {
  getAll: () => api.get('/about'),
  getById: (id) => api.get(`/about/${id}`),
  create: (formData) => api.post('/about', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, formData) => api.put(`/about/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/about/${id}`),
};

// Message APIs
export const messageAPI = {
  getAll: () => api.get('/message'),
  markAsRead: (id, read = true) => api.patch(`/message/${id}/read`, { read }),
  delete: (id) => api.delete(`/message/${id}`),
};

// Analytics APIs
export const analyticsAPI = {
  get: () => api.get('/analytics'),
  updateVisits: (visits) => api.put('/analytics/visits', { visits }),
};

export default api;

