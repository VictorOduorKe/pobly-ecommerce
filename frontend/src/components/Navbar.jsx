import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
const Navbar = () => {
    const { cartCount } = useCart();
    const { isAuthenticated, logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAdmin = isAuthenticated && user?.role === 'admin';
    const isUser = isAuthenticated && user?.role !== 'admin';

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-7">
                        <Link to="/" className="flex items-center py-2 px-2">
                            <img src={logo} alt="Pobly Logo" className="h-10 w-10 mr-2" />
                            <span className="font-bold text-brown-900 text-xl font-serif">Pobly</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-1" onClick={() => setIsMobileMenuOpen(false)}>
                            {!isAdmin && (
                                <>
                                    <NavLink to="/shop" className={({ isActive }) => `py-4 px-2 font-semibold transition duration-300 ${isActive ? 'text-sienna-500 border-b-2 border-sienna-500' : 'text-brown-700 hover:text-sienna-500'}`}>Shop</NavLink>
                                    <NavLink to="/about" className={({ isActive }) => `py-4 px-2 font-semibold transition duration-300 ${isActive ? 'text-sienna-500 border-b-2 border-sienna-500' : 'text-brown-700 hover:text-sienna-500'}`}>About</NavLink>
                                    <NavLink to="/contact" className={({ isActive }) => `py-4 px-2 font-semibold transition duration-300 ${isActive ? 'text-sienna-500 border-b-2 border-sienna-500' : 'text-brown-700 hover:text-sienna-500'}`}>Contact</NavLink>
                                </>
                            )}
                            {isUser && <NavLink to="/my-orders" className={({ isActive }) => `py-4 px-2 font-semibold transition duration-300 ${isActive ? 'text-sienna-500 border-b-2 border-sienna-500' : 'text-brown-700 hover:text-sienna-500'}`}>My Orders</NavLink>}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Link to="/cart" className="relative flex items-center py-2 px-3 rounded transition duration-300 text-brown-700 hover:text-sienna-500">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-sienna-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
                            )}
                        </Link>
                        <div className="hidden md:flex items-center space-x-3" onClick={() => setIsMobileMenuOpen(false)}>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="py-2 px-3 font-medium text-brown-700 rounded hover:text-sienna-500 transition duration-300"><FontAwesomeIcon icon={faUser} size="lg" /></Link>
                                    <button onClick={logout} className="py-2 px-3 text-white font-medium bg-sienna-500 rounded hover:bg-brown-900 transition duration-300">Logout</button>
                                </>
                            ) : (
                                <Link to="/login" className="py-2 px-3 font-medium text-brown-700 rounded hover:bg-amber-100 transition duration-300">Log In</Link>
                            )}
                        </div>
                        {/* Mobile menu button */}
                        <button className="md:hidden p-2 text-brown-700 hover:text-sienna-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
                        </button>
                    </div>
                </div>
                {/* Mobile menu content */}
                {isMobileMenuOpen && (
                    <div className="md:hidden flex flex-col space-y-1 pb-3 pt-2" onClick={() => setIsMobileMenuOpen(false)}>
                        {!isAdmin && (
                            <>
                                <NavLink to="/shop" className={({ isActive }) => `block py-2 px-3 text-sm font-semibold ${isActive ? 'text-sienna-500' : 'text-brown-700 hover:bg-amber-100'}`}>Shop</NavLink>
                                <NavLink to="/about" className={({ isActive }) => `block py-2 px-3 text-sm font-semibold ${isActive ? 'text-sienna-500' : 'text-brown-700 hover:bg-amber-100'}`}>About</NavLink>
                                <NavLink to="/contact" className={({ isActive }) => `block py-2 px-3 text-sm font-semibold ${isActive ? 'text-sienna-500' : 'text-brown-700 hover:bg-amber-100'}`}>Contact</NavLink>
                            </>
                        )}
                        {isUser && <NavLink to="/my-orders" className={({ isActive }) => `block py-2 px-3 text-sm font-semibold ${isActive ? 'text-sienna-500' : 'text-brown-700 hover:bg-amber-100'}`}>My Orders</NavLink>}
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="block py-2 px-3 text-sm font-semibold text-brown-700 hover:bg-amber-100">Profile</Link>
                                <button onClick={logout} className="block w-full text-left py-2 px-3 text-sm font-semibold text-white bg-sienna-500 rounded hover:bg-brown-900">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="block py-2 px-3 text-sm font-semibold text-brown-700 hover:bg-amber-100">Log In</Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;