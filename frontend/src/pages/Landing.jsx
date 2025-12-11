import { useState, useEffect } from "react";
import { getBooks } from "../api";

// Make it a standard, synchronous functional component
export const Landing = () => {
    const [limitedBooks, setLimitedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use useEffect to fetch data after the component mounts
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Ensure the API call returns the data correctly (adjust based on your actual API wrapper)
                // Assuming getBooks() returns { data: [...] }
                const response = await getBooks();
                const books = response.data || response; // Use response.data if using axios/fetch, otherwise just response

                const limited = books.slice(0, 3);
                setLimitedBooks(limited);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch books:", err);
                setError("Failed to load featured books.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []); // Empty dependency array means this runs once on mount

    // --- Component Rendering ---

    return (
        <div className="bg-brown-900 min-h-[60vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* ... other JSX content ... */}
            <div className="absolute inset-0 bg-gradient-to-br from-brown-900/90 to-brown-700/80 z-0" />
        <div className="relative z-10 py-20 px-4 w-full max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">The Story Books</h1>
            <p className="text-lg md:text-xl text-sienna-500 mb-8 font-medium">The books are shattering that pausing within you and us. Find your story and add to your shelf.</p>
            <button className="bg-sienna-500 text-white px-6 py-2 rounded font-semibold text-lg shadow hover:bg-brown-900 hover:text-sienna-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">Big Stories</button>
        </div>
            <div className="relative z-10 w-full bg-white py-12 px-4 mt-[-4rem] rounded-t-3xl shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-brown-900 mb-8">Nurturing Revelations</h2>
                
                {/* Conditional Rendering based on state */}
                {isLoading && <p className="text-brown-900">Loading featured books...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {limitedBooks.map((book) => (
                            <div key={book.id} className="bg-brown-700 rounded-lg shadow p-4 flex flex-col items-center">
                                {/* Dynamic book content goes here */}
                                <h2 className=" bg-gray-100 rounded mb-4 flex font-serif text-lg text-brown-900">
                                    {book.title}
                                </h2>
                                 <div className="w-32 h-44 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
                                    {book.image_url ? (
                                        <img src={book.image_url} alt={book.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <span className="font-serif text-lg text-brown-900">{book.title}</span>
                                    )}
                                </div>
                                <div className="text-white font-bold mb-1">{book.title}</div>
                                <div className="text-sienna-500 text-sm mb-2">by {book.author}</div>
                                <button className="bg-sienna-500 text-white px-3 py-1 rounded font-semibold text-sm hover:bg-brown-900 hover:text-sienna-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">View</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Landing;