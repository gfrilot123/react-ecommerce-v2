import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js';

export const ProductContext = createContext({
    products: {},

});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState({});

    // Section 10 Module 123 Firebase DB Storage
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // },[]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setProducts(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = { products };
    return (
        <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    );
};

/**
 *  The built in factory function createContext(default) creates a context instance
 *  Context.Provider component available on the context instance is used to provide 
 *      the context to its child components, no matter how deep they are.
 *  To set the value of context use the value prop available on the 
 *      <Context.Provider value={value} />
 * 
 *  The main idea of using the context is to allow your components to access some
 *      global data and re-render when the global data is changed. Context solves
 *      the props drilling problem: passing props down from parent to children
 *  
 *  Using the context requires 3 steps:
 *  1- creating
 *  2- providing
 *  3- consuming the context
 *  
 */