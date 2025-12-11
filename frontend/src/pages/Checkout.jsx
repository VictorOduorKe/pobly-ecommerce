
import { useState, useEffect } from 'react';
import { getOrders, updateOrder } from '../api';
import { useSearchParams } from 'react-router-dom';

const Checkout = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [order, setOrder] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [phone, setPhone] = useState('');
    const [payment, setPayment] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) return;
            try {
                const res = await getOrders();
                // Find the order by ID (should be the latest one for this user)
                const found = res.data.find(o => String(o.id) === String(orderId));
                setOrder(found);
                // Optionally prefill address fields if present
                if (found) {
                    setAddress(found.address || '');
                    setCity(found.city || '');
                    setPostal(found.postal_code || '');
                    setPhone(found.phone || '');
                }
            } catch {
                setOrder(null);
            }
        };
        fetchOrder();
    }, [orderId]);

    // You may want to implement an update order endpoint to save address/phone/payment after confirmation

    if (!order) {
        return <div className="p-8 text-center">Loading order...</div>;
    }
    // For demo, items are not fetched here; in production, fetch order items from backend
    // Here, just show total and address fields for now

    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        setSuccess('');
        try {
            await updateOrder(order.id, {
                address,
                city,
                postal_code: postal,
                phone,
            });
            setSuccess('Order updated with delivery details!');
        } catch (err) {
            setSuccess('Failed to update order.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-[60vh] py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8">
                <form className="flex-1" onSubmit={handleUpdateOrder}>
                    <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6">Checkout</h2>
                    {success && <div className="text-green-600 mb-4">{success}</div>}
                    <div className="mb-4">
                        <label className="block text-brown-900 mb-1 font-semibold">Shipping Address</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-brown-900 mb-1 font-semibold">City</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-brown-900 mb-1 font-semibold">Postal Code</label>
                        <input type="text" value={postal} onChange={e => setPostal(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-brown-900 mb-1 font-semibold">Phone Number</label>
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-brown-900 mb-1 font-semibold">Payment Details</label>
                        <input type="text" value={payment} onChange={e => setPayment(e.target.value)} required placeholder="Card number or payment info" className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                    <button type="submit" className="w-full bg-amber-300 text-brown-900 py-2 rounded font-bold hover:bg-amber-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Place Order</button>
                </form>
                <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-brown-900 mb-4">Order Summary</h3>
                    <div className="mb-4">Order ID: {order.id}</div>
                    <div className="mb-4">Total: <span className="font-bold">${Number(order.total).toFixed(2)}</span></div>
                    <div className="bg-gray-100 rounded p-4 mt-4">
                        <h4 className="font-bold mb-2 text-brown-900">Delivery Details</h4>
                        <div className="text-brown-900 text-sm">{address && (<div><span className='font-semibold'>Address:</span> {address}</div>)}
                            {city && (<div><span className='font-semibold'>City:</span> {city}</div>)}
                            {postal && (<div><span className='font-semibold'>Postal Code:</span> {postal}</div>)}
                            {phone && (<div><span className='font-semibold'>Phone:</span> {phone}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;