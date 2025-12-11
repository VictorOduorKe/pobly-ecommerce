import { useEffect, useState } from 'react';
import { getOrders, deleteOrder, updateOrder } from '../api';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
const uniqueId = Math.random().toString(36).substring(2, 15);
//generate unique id for each item
 const eachItmenRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [message]);

  const handleDelete = async (id) => {
    setMessage('');
    try {
      await deleteOrder(id);
      setMessage('Order deleted successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete order.');
    }
  };

  const handleConfirm = async (id) => {
    setMessage('');
    try {
      await updateOrder(id, { status: 'delivered' });
      setMessage('Order confirmed as received.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to confirm order.');
    }
  };

  const handleReturn = async (id) => {
    setMessage('');
    try {
      await updateOrder(id, { status: 'returned' });
      setMessage('Order marked as returned.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to return order.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {message && <div className="mb-4 text-blue-600">{message}</div>}
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
                <td className="p-2">{eachItmenRandomId()}</td>
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
