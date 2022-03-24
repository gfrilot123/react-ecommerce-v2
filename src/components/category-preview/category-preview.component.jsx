import { Link } from 'react-router-dom';
import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ( { title, products}) => {
 return (
     <div className='category-preview-container'>
         <h2>
             <Link to={`/shop/${title}`}>
             <span className='title'>{title.toUpperCase()}</span>
             </Link>
         </h2>
         <div className='preview'>
            {
                // filter out anything but the first 4 _ means ignore
                products.filter((_, idx) => idx < 4)
                .map((product) => 
                 <ProductCard key={product.id} product={product} />)
            }
         </div>
     </div>
 )
}

export default CategoryPreview;