import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_BASE,
	withCredentials: true,
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');

// User
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);
export const requestPasswordReset = (data) => api.post('/users/request-password-reset', data);
export const resetPassword = (data) => api.post('/users/reset-password', data);

// Books
export const getBooks = () => api.get('/books');
export const searchBooks = (params) => api.get('/books/search', { params });
export const getCategories = () => api.get('/books/categories');
export const addBook = (data) => api.post('/books', data);
export const editBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// Orders
export const getOrders = () => api.get('/orders');
export const createOrder = (data) => api.post('/orders', data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const confirmOrder = (id) => api.put(`/orders/${id}/confirm`);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Admin
export const getDashboard = () => api.get('/admin/dashboard');
export const getSalesTrends = () => api.get('/admin/sales');
export const getAllUsers = () => api.get('/admin/users');
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const getTopBooks = () => api.get('/admin/analytics/top-books');
export const getRevenueByCategory = () => api.get('/admin/analytics/revenue-category');

export default api;
