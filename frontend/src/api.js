import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_BASE,
	withCredentials: true,
});

// Auth
export const register = (data) => api.post('/api/auth/register', data);
export const login = (data) => api.post('/api/auth/login', data);
export const logout = () => api.post('/api/auth/logout');

// User
export const getProfile = () => api.get('/api/users/profile');
export const updateProfile = (data) => api.put('/api/	users/profile', data);
export const requestPasswordReset = (data) => api.post('/api/users/request-password-reset', data);
export const resetPassword = (data) => api.post('/api/users/reset-password', data);

// Books
export const getBooks = () => api.get('/api/books');
export const searchBooks = (params) => api.get('/api/books/search', { params });
export const getCategories = () => api.get('/api/books/categories');
export const addBook = (data) => api.post('/api/books', data);
export const editBook = (id, data) => api.put(`/api/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/api/books/${id}`);

// Orders
export const getOrders = () => api.get('/api/orders');
export const createOrder = (data) => api.post('/api/orders', data);
export const updateOrder = (id, data) => api.put(`/api/orders/${id}`, data);
export const confirmOrder = (id) => api.put(`/api/orders/${id}/confirm`);
export const deleteOrder = (id) => api.delete(`/api/orders/${id}`);

// Admin
export const getDashboard = () => api.get('/api/admin/dashboard');
export const getSalesTrends = () => api.get('/api/admin/sales');
export const getAllUsers = () => api.get('/api/admin/users');
export const deleteUser = (id) => api.delete(`/api/admin/users/${id}`);
export const getTopBooks = () => api.get('/api/admin/analytics/top-books');
export const getRevenueByCategory = () => api.get('/api/admin/analytics/revenue-category');

export default api;
