import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../../api';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const res = await getBooks();
            setBooks(res.data);
        } catch {
            setError('Failed to fetch books');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this book?')) return;
        await deleteBook(id);
        fetchBooks();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-brown-900">All Books</h2>
            <Link to="/admin/add-book" className="bg-sienna-500 text-amber-100 px-4 py-2 rounded font-bold hover:bg-brown-900 hover:text-amber-300 transition mb-4 inline-block">Add Book</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white rounded shadow p-6 flex flex-col gap-2">
                        <div className="font-bold text-brown-900">{book.title}</div>
                        <div className="text-sienna-500">by {book.author}</div>
                        <div className="text-sm text-brown-700">{book.category}</div>
                        <div className="text-sm">${book.price}</div>
                        <div className="flex gap-2 mt-2">
                            <Link to={`/admin/edit-book/${book.id}`} className="bg-amber-300 text-brown-900 px-3 py-1 rounded font-semibold hover:bg-amber-500 transition">Edit</Link>
                            <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;