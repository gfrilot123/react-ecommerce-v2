import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === productToAdd.id
    );
    
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }


    // return back cart items with matching cart items with reduced quantity
    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    hidden: true,
    setHidden: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {

    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartTotal =  cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        )
        setCartTotal(newCartTotal);
    },[cartItems]);

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }
    
    const value = {hidden, setHidden, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartTotal};
    return ( 
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};