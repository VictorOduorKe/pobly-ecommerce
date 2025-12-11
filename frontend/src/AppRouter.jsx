import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
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

const AppRouter = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="flex-1 animate-fadein">
                <Routes>
                    {/* Public/User Routes */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/my-orders" element={<UserOrders />} />
                    <Route path="/profile" element={<Profile />} />

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
    );
};

export default AppRouter;
