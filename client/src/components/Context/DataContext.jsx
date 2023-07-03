import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

// Create a new context for the cart
const dataContext = createContext();

// Custom hook to access the cart context from any component
export function useCart() {
    return useContext(dataContext);
}

// Cart provider component, which holds the cart state and provides it to child components
export default function DataProvider(props) {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('cartItems');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    const addItemToCart = useCallback((item) => {
        const cartItem = {
            id: item._id,
            title: item.title,
            price: item.price,
            quantity: 1
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existingItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);
        if (existingItemIndex === -1) {
            cartItems.push(cartItem);
        } else {
            cartItems[existingItemIndex].quantity++;
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setItems(cartItems);
    }, []);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setItems(JSON.parse(storedCartItems));
        }
    }, []);

    const removeItem = useCallback((itemId) => {
        const updatedItems = items.filter((i) => i.id !== itemId);
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }, [items]);

    const updateItemQuantity = useCallback((itemId, quantity) => {
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity };
            } else {
                return item;
            }
        });
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }, [items]);

    // Memoized calculation of the total number of items in the cart
    const totalItems = useMemo(() => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        return isNaN(count) ? 0 : count;
    }, [items]);

    // clear cart function
    const clearCart = useCallback(() => {
        localStorage.removeItem('cartItems');
        setItems([]);
    }, []);

    // Memoized value of the cart context
    const contextValue = useMemo(() => ({
        items,
        addItemToCart,
        removeItem,
        updateItemQuantity,
        totalItems,
        clearCart, // add clearCart to the context value
    }), [items, addItemToCart, removeItem, updateItemQuantity, totalItems, clearCart]);

    return <dataContext.Provider value={contextValue} {...props} />;
}