
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { getBooks, searchBooks, getCategories } from '../api';
import { useCart } from '../context/CartContext';





const Shop = () => {
    const [selected, setSelected] = useState('All');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState(['All']);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(['All', ...res.data]);
            } catch {
                setCategories(['All']);
                toast.error('Failed to fetch categories.');
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                if (selected === 'All' && !search) {
                    const res = await getBooks();
                    setBooks(res.data);
                } else {
                    const params = {};
                    if (selected !== 'All') params.category = selected;
                    if (search) params.q = search;
                    const res = await searchBooks(params);
                    setBooks(res.data);
                }
            } catch {
                setBooks([]);
                toast.error('Failed to fetch books.');
            }
            setLoading(false);
        };
        fetchBooks();
    }, [selected, search]);

    const { addToCart } = useCart();

    const handleAddToCart = (book) => {
        addToCart(book);
        toast.success(`${book.title} added to cart!`);
    };

    return (
        <div className="bg-gray-100 min-h-[60vh] py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-brown-900 mb-6">Shop Books</h2>
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelected(cat)}
                            className={`px-4 py-1  bg-amber-950 rounded-full font-semibold border transition duration-300 ease-in-out transform hover:scale-105 animate-fadein 
                                ${selected === cat
                                    ? 'bg-brown-900 text-amber-200 border-brown-900'
                                    : 'bg-sienna-500 text-white border-sienna-500 hover:bg-brown-900 hover:text-amber-200'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full max-w-md px-3 py-2 border border-sienna-500 rounded focus:outline-none focus:ring-2 focus:ring-sienna-500"
                    />
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {books.map(book => (
                            <div key={book.id} className="bg-amber-900 rounded-lg shadow p-4 flex flex-col items-center">
                                <div className="w-32 h-44 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
                                    {book.image_url ? (
                                        <img src={book.image_url} alt={book.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <span className="font-serif text-lg text-brown-900">{book.title}</span>
                                    )}
                                </div>
                                <div className="text-white font-bold mb-1">{book.title}</div>
                                <div className="text-sienna-500 text-sm mb-2">by {book.author}</div>
                                <div className="text-gray-500 font-semibold mb-2">${Number(book.price).toFixed(2)}</div>
                                <button onClick={() => handleAddToCart(book)} className="bg-amber-700 text-amber-100 px-3 py-1 rounded font-semibold text-sm hover:bg-brown-900 hover:text-amber-300 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Add to Cart</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;