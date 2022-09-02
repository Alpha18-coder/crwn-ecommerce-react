import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains the product
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );

    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((item) =>
        item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
    };

    //otherwhise return new array with modified cartItems + newItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        item => item.id === cartItemToRemove.id
    );
    // check if quantity is equal to 1, if it is remove that item from the cart
    //only filter those that are equal to the value
     if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((item) => 
        item.id === cartItemToRemove.id
        ? {...item, quantity: item.quantity - 1}
        : item
    );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((item) => item.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const[isCartOpen, setIsCartOpen] = useState(false);
    const[cartItems, setCartItems] = useState([]);
    const[cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    //this belongs to cartCounter 
    useEffect(() => {
       const newCartCount = cartItems.reduce((total, item) => total + item.quantity,0);
       setCartCount(newCartCount);
    }, [cartItems]);

    //this belongs to cartTotal
    useEffect(() => {
        const newCartTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    //do not mix them!

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        clearItemFromCart,
        cartCount, 
        cartItems,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}