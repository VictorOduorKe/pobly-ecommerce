
import { useState } from 'react';
import { login, getProfile } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
            const res = await getProfile();
            if (res.data.role === 'admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/shop';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-brown-900">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6 text-center">Login to Pobly</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-brown-900 mb-1 font-semibold">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div className="mb-6">
                    <label className="block text-brown-900 mb-1 font-semibold">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <button type="submit" className="w-full bg-amber-900 text-white py-2 rounded font-bold hover:bg-brown-900 hover:text-sienna-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Login</button>
                <div className="mt-4 text-center text-sm">
                    Don't have an account? <a href="/register" className="text-sienna-500 hover:underline">Register</a>
                </div>
            </form>
        </div>
    );
};

export default Login;