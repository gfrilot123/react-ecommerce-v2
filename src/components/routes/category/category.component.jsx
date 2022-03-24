import { useContext, useState, useEffect, Fragment } from 'react';
import { ProductContext } from '../../../contexts/products.context';
import { useParams } from 'react-router-dom';
import './category.styles.scss';
import ProductCard from '../../product-card/product-card.component';


const Category = () => {
    const { category } = useParams();
    const { products } = useContext(ProductContext);
    const [ product, setProduct] = useState(products[category]);

    useEffect(() => {
        setProduct(products[category]);
    },[category, products]);

    return (
        <Fragment>
            <h2 className='title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    product && product.map((products) => (<ProductCard key={products.id} product={products} />)
                )}
            </div>
        </Fragment>
    )
}

export default Category;