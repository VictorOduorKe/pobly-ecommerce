import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';
// Admin pages
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import AddBook from './pages/admin/AddBook';
import EditBook from './pages/admin/EditBook';
import Books from './pages/admin/Books';
import Sales from './pages/admin/Sales';
import AdminNav from './components/admin/AdminNav';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { useState, useCallback } from 'react';



const AppRouter = () => {
    const [notification, setNotification] = useState({ message: '', type: 'info' });
    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type });
    }, []);
    const clearNotification = useCallback(() => setNotification({ message: '', type: 'info' }), []);

    // Pass showNotification as prop to pages if needed
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Navbar />
                <Notification message={notification.message} type={notification.type} onClose={clearNotification} />
                <main className="flex-1 animate-fadein">
                    <Routes>
                        {/* Public/User Routes */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login showNotification={showNotification} />} />
                        <Route path="/register" element={<Register showNotification={showNotification} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact showNotification={showNotification} />} />
                        <Route path="/shop" element={<Shop showNotification={showNotification} />} />
                        <Route path="/cart" element={<Cart showNotification={showNotification} />} />
                        <Route path="/checkout" element={<Checkout showNotification={showNotification} />} />
                        <Route path="/my-orders" element={<UserOrders />} />

                        {/* Admin Routes (role-based access placeholder) */}
                        <Route path="/admin/*" element={
                            <div>
                                <AdminNav />
                                <div className="p-4">
                                    <Routes>
                                        <Route path="dashboard" element={<Dashboard />} />
                                        <Route path="orders" element={<Orders />} />
                                        <Route path="users" element={<Users />} />
                                        <Route path="add-book" element={<AddBook />} />
                                        <Route path="edit-book/:id" element={<EditBook />} />
                                        <Route path="books" element={<Books />} />
                                        <Route path="sales" element={<Sales />} />
                                    </Routes>
                                </div>
                            </div>
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default AppRouter;
