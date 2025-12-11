
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login({ email, password });
            // On success, navigation is handled by the context.
        } catch (err) {
            // On failure, re-enable the form. The error toast is handled in the context.
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-brown-900">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6 text-center">Login to Pobly</h2>
                <div className="mb-4">
                    <label className="block text-brown-900 mb-1 font-semibold">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div className="mb-6">
                    <label className="block text-brown-900 mb-1 font-semibold">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-amber-900 text-white py-2 rounded font-bold hover:bg-brown-900 hover:text-sienna-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein disabled:opacity-60">
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
                <div className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/register" className="text-sienna-500 hover:underline">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;