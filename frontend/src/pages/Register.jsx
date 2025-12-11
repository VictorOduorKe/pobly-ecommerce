
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            toast.success('Registration successful! Redirecting to login...', {
                onClose: () => navigate('/login')
            });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-brown-900">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6 text-center">Create Your Account</h2>
                <div className="mb-4">
                    <label className="block text-brown-900 mb-1 font-semibold">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div className="mb-4">
                    <label className="block text-brown-900 mb-1 font-semibold">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div className="mb-6">
                    <label className="block text-brown-900 mb-1 font-semibold">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <button type="submit" className="w-full bg-amber-900 text-brown-900 py-2 rounded font-bold hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Register</button>
                <div className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="text-amber-500 hover:underline">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;