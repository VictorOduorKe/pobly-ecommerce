import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse cart data from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
       // console.log('Cart Items Updated:', cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (book) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === book.id);
            if (exist) {
                return prevItems.map(item =>
                    item.id === book.id ? { ...item, qty: (Number(item.qty) || 1) + 1 } : item
                );
            } else {
                return [...prevItems, { ...book, qty: 1 }];
            }
        });
    };

    const removeFromCart = (bookId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
    };

    const updateQty = (bookId, newQty) => {
        if (newQty < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === bookId ? { ...item, qty: Number(newQty) } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
    //console.log('Calculated cartCount:', cartCount);

    const value = { cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
