import { useEffect, useState } from 'react';
import { getOrders, deleteOrder, updateOrder } from '../api';
import { toast } from 'react-toastify';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch {
        toast.error('Failed to fetch orders.');
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      toast.success('Order deleted successfully.');
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete order.');
    }
  };

  const handleConfirm = async (id) => {
    try {
      await updateOrder(id, { status: 'delivered' });
      toast.success('Order confirmed as received.');
      setOrders(prevOrders => prevOrders.map(o => o.id === id ? { ...o, status: 'delivered' } : o));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm order.');
    }
  };

  const handleReturn = async (id) => {
    try {
      await updateOrder(id, { status: 'returned' });
      toast.success('Order marked as returned.');
      setOrders(prevOrders => prevOrders.map(o => o.id === id ? { ...o, status: 'returned' } : o));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to return order.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Order ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">${Number(order.total).toFixed(2)}</td>
                <td className="p-2 flex gap-2">
                  {order.status === 'pending' && (
                    <button onClick={() => handleDelete(order.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  )}
                  {order.status === 'delivered' && (
                    <button onClick={() => handleReturn(order.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">Return</button>
                  )}
                  {order.status === 'confirmed' && (
                    <button onClick={() => handleConfirm(order.id)} className="bg-green-500 text-white px-2 py-1 rounded">Confirm Received</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
