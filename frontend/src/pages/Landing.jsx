import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getBooks } from "../api";
import backgroundImg from "../assets/background.png";

// Make it a standard, synchronous functional component
export const Landing = () => {
    const [limitedBooks, setLimitedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            } catch (err) {
                console.error("Failed to fetch books:", err);
                toast.error("Failed to load featured books.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []); // Empty dependency array means this runs once on mount

    // --- Component Rendering ---

    return (
        <>
            <div
                className="min-h-[60vh] mt-4 flex flex-col justify-end items-center text-center relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImg})` }}
            >
                {/* ... other JSX content ... */}
                <div className="absolute inset-0 bg-linear-to-br from-brown-900/90 to-brown-700/80 z-0" />
                <div className="relative z-20 mb-4 px-4">
                    <button className="bg-amber-900 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-amber-700 hover:text-sienna-500 transition duration-300 ease-in-out transform hover:scale-105 animate-fadein">
                        Big Stories
                    </button>
                </div>
            </div>
            <div className="relative z-10 w-full bg-white py-12 px-4 mt-4 rounded-t-3xl shadow-lg text-center">
                <h2 className="text-2xl font-serif font-bold text-brown-900 mb-8">Nurturing Revelations</h2>

                {/* Conditional Rendering based on state */}
                {isLoading && <p className="text-brown-900">Loading featured books...</p>}

                {!isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {limitedBooks.map((book) => (
                            <div key={book.id} className="bg-amber-700 rounded-lg shadow p-4 flex flex-col items-center text-center">
                                {/* Dynamic book content goes here */}
                                <div className="w-32 h-44 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
                                    {book.image_url ? (
                                        <img src={book.image_url} alt={book.title} className="object-cover w-full h-full" />
                                    ) : (
                                        <span className="font-serif text-lg text-brown-900 p-2">{book.title}</span>
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
        </>
    );
};
export default Landing;