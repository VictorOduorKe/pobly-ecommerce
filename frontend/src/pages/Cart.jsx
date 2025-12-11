
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api';
import { useState } from 'react';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // For now, create order with minimal info, address/city/postal/phone can be filled in checkout
            const res = await createOrder({
                items: cartItems.map(item => ({ book_id: item.id, quantity: item.qty, price: item.price })),
                total,
                address: '',
                city: '',
                postal_code: '',
                phone: '',
            });
            clearCart();
            navigate(`/checkout?orderId=${res.data.orderId}`);
        } catch (err) {
            alert('Failed to create order.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-gray-100 min-h-[60vh] py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
                <h2 className="text-3xl font-serif font-bold text-brown-900 mb-6">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <div className="text-brown-700">Your cart is empty.</div>
                ) : (
                    <div>
                        <ul className="divide-y divide-brown-100 mb-6">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex items-center justify-between py-4">
                                    <div>
                                        <div className="font-bold text-brown-900">{item.title}</div>
                                        <div className="text-sm text-brown-700">by {item.author}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-brown-900">${Number(item.price).toFixed(2)}</span>
                                        <span className="text-brown-700">x{item.qty}</span>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline text-sm transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center font-bold text-lg text-brown-900 mb-4">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="block w-full bg-amber-300 text-brown-900 py-2 rounded font-bold text-center hover:bg-amber-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein disabled:opacity-60"
                        >
                            {loading ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;