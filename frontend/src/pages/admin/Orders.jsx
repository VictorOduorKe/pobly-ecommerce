import { useEffect, useState } from 'react';
import { getOrders, confirmOrder, deleteOrder } from '../../api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getOrders();
            setOrders(res.data);
        } catch {
            setError('Failed to fetch orders');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleConfirm = async (id) => {
        await confirmOrder(id);
        fetchOrders();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this order?')) return;
        await deleteOrder(id);
        fetchOrders();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-brown-900">All Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded shadow p-6 flex flex-col gap-2">
                        <div className="font-bold text-brown-900">Order #{order.id}</div>
                        <div className="text-sienna-500">User: {order.user_id}</div>
                        <div className="text-sm text-brown-700">Status: {order.status}</div>
                        <div className="text-sm">Total: ${order.total}</div>
                        <div className="flex gap-2 mt-2">
                            {order.status === 'pending' && (
                                <button onClick={() => handleConfirm(order.id)} className="bg-amber-300 text-brown-900 px-3 py-1 rounded font-semibold hover:bg-amber-500 transition">Confirm</button>
                            )}
                            <button onClick={() => handleDelete(order.id)} className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;