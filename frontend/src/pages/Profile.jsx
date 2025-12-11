import { useEffect, useState } from 'react';
import { getProfile, logout } from '../api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setUser(res.data);
            } catch {
                setUser(null);
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>Not logged in.</div>;

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="mb-2"><strong>Name:</strong> {user.name}</div>
            <div className="mb-2"><strong>Email:</strong> {user.email}</div>
            <div className="mb-2"><strong>Role:</strong> {user.role}</div>
            <button onClick={handleLogout} className="mt-4 bg-sienna-500 text-amber-100 px-4 py-2 rounded font-bold hover:bg-brown-900 hover:text-amber-300 transition">Logout</button>
        </div>
    );
};

export default Profile;
