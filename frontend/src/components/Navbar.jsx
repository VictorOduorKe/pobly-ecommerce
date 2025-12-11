
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfile, logout } from '../api';


const Navbar = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setUser(res.data);
            } catch {
                setUser(null);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <nav className="bg-amber-950 text-white px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-2xl font-serif font-bold tracking-wide text-sienna-500">Pobly</Link>
                <div className="hidden md:flex gap-4 text-sm font-medium">
                    <Link to="/shop" className="hover:text-sienna-500 transition">Shop</Link>
                    <Link to="/about" className="hover:text-sienna-500 transition">About</Link>
                    <Link to="/contact" className="hover:text-sienna-500 transition">Contact</Link>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/cart" className="hover:text-sienna-500 transition">Cart</Link>
                {user ? (
                    <>
                        <Link to="/my-orders" className="bg-amber-300 text-brown-900 px-3 py-1 rounded font-semibold hover:bg-amber-500 transition">My Orders</Link>
                        <Link to="/profile" className="flex items-center gap-2 bg-sienna-500 text-amber-100 px-3 py-1 rounded font-semibold hover:bg-brown-900 hover:text-amber-300 transition">
                            <span className="font-bold">{user.name}</span>
                            <span className="hidden md:inline text-xs">({user.role})</span>
                        </Link>
                        <button onClick={handleLogout} className="bg-brown-900 text-amber-200 px-3 py-1 rounded font-semibold hover:bg-sienna-500 hover:text-white transition">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-sienna-500 text-white px-3 py-1 rounded font-semibold hover:bg-brown-900 hover:text-sienna-500 transition">Login</Link>
                        <Link to="/register" className="hidden md:inline text-brown-900 px-3 py-1 rounded font-semibold border border-sienna-500 hover:bg-sienna-500 hover:text-white transition">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;