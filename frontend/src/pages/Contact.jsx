
import { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Thank you for your message!');
        setName('');
        setEmail('');
        setMessage('');
        // TODO: Integrate with backend API
    };

    return (
        <div className="bg-brown-900 min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-serif font-bold text-brown-900 mb-6 text-center">Contact Us</h2>
                <div className="mb-4">
                    <label className="block text-brown-900 mb-1 font-semibold">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div className="mb-4">
                    <label className="block text-brown-900 mb-1 font-semibold">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" />
                </div>
                <div className="mb-6">
                    <label className="block text-brown-900 mb-1 font-semibold">Message</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} required className="w-full px-3 py-2 border border-brown-500 rounded focus:outline-none focus:ring-2 focus:ring-amber-300" rows={4} />
                </div>
                <button type="submit" className="w-full bg-amber-300 text-brown-900 py-2 rounded font-bold hover:bg-amber-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;