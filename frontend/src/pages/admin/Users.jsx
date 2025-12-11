import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getAllUsers();
            setUsers(res.data);
        } catch {
            setError('Failed to fetch users');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        await deleteUser(id);
        fetchUsers();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-brown-900">All Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map(user => (
                    <div key={user.id} className="bg-white rounded shadow p-6 flex flex-col gap-2">
                        <div className="font-bold text-brown-900">{user.name}</div>
                        <div className="text-sienna-500">{user.email}</div>
                        <div className="text-sm text-brown-700">Role: {user.role}</div>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;