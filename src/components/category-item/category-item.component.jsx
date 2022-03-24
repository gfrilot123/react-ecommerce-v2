import { useNavigate } from 'react-router-dom';
import './category-item.styles.scss';

const CategoryItem = ({category}) => {
    const navigate = useNavigate();
    // Destructures imageUrl and title from prop category
    const { imageUrl, title, route } = category;
    const onNavigateHandler = () => navigate(route);

    return (
        <div className="cat-container">
        <div className="background-image" style={{
          backgroundImage: `url(${imageUrl})`
        }}/>
        <div className="category-body-container" onClick={onNavigateHandler}>
          <h2>{title.toUpperCase()}</h2>
          <p>SHOP NOW</p>
        </div>
      </div>
    )
}

export default CategoryItem;