import { useState } from 'react';
import { addBook } from '../../api';

const AddBook = () => {
    const [form, setForm] = useState({
        title: '', author: '', description: '', category: '', price: '', stock: '', image_url: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await addBook(form);
            setSuccess('Book added successfully!');
            setForm({ title: '', author: '', description: '', category: '', price: '', stock: '', image_url: '' });
        } catch {
            setError('Failed to add book');
        }
    };

    return (
        <div className="max-w-md mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-brown-900">Add New Book</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-4">
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border px-3 py-2 rounded" required />
                <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="border px-3 py-2 rounded" required />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border px-3 py-2 rounded" required />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="border px-3 py-2 rounded" required />
                <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="border px-3 py-2 rounded" required />
                <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="border px-3 py-2 rounded" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border px-3 py-2 rounded" />
                <button type="submit" className="bg-sienna-500 text-amber-100 px-4 py-2 rounded font-bold hover:bg-brown-900 hover:text-amber-300 transition">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;