import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile, login as apiLogin, logout as apiLogout } from '../api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuthStatus = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            if (token) {
                const res = await getProfile();
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = async (credentials) => {
        try {
            await apiLogin(credentials);
            const res = await getProfile();
            setUser(res.data);
            setIsAuthenticated(true);
            toast.success('Login successful! Redirecting...');
            navigate(res.data.role === 'admin' ? '/admin/dashboard' : '/shop');
        } catch (err) {
            localStorage.removeItem('token'); // Clean up on any failure
            setUser(null);
            setIsAuthenticated(false);
            const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
            throw err; // Re-throw error to be caught in the component
        }
    };

    const logout = async () => {
        await apiLogout();
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        toast.success('You have been logged out.');
        navigate('/login');
    };

    const value = { user, isAuthenticated, isLoading, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};