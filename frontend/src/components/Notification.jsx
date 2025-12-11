import { useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const color = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-sienna-500';

    return (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold animate-fadein ${color}`}>
            {message}
        </div>
    );
};

export default Notification;
