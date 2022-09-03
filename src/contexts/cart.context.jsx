import { createContext, useReducer } from 'react';
import createAction from '../utils/reducer/reducer.utils';

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

const CART_ACTION_TYPES = { 
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_DROPDOWN: 'TOGGLE_DROPDOWN'
}

//reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state, ...action.payload};
        case CART_ACTION_TYPES.TOGGLE_DROPDOWN: 
            return {...state, isCartOpen: action.payload};
        default:
            throw new Error(`Unhandled type ${action.type} in CartReducer`);
    }
}

//initialValue
const INITIAL_STATE = { 
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false,
}


export const CartProvider = ({ children }) => {
    const[state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { cartItems, cartCount, cartTotal, isCartOpen } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
        dispatch(
          createAction( CART_ACTION_TYPES.SET_CART_ITEMS, 
            {
              cartItems: newCartItems, 
              cartCount: newCartCount, 
              cartTotal: newCartTotal
            })
        )
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_DROPDOWN, bool));
    }


    const addItemToCart = (product) => {
        const newCartItem = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItem);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItem = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItem);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItem = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItem);
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