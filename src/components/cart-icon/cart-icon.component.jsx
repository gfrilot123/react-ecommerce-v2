import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'; 
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {

    const { hidden, setHidden, cartItems } = useContext(CartContext);
    const toggleSetHidden = () => setHidden(!hidden);

    /**
     * @author Gerald Frilot
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
     * 
     * let initialValue = 0
       let sum = [{x: 1}, {x: 2}, {x: 3}].reduce(
            (previousValue, currentValue) => previousValue + currentValue.x
            , initialValue
        )

        console.log(sum) // logs 6

     */
    const totalItemsInCart = cartItems.reduce((previousValue, currentValue) => 
       previousValue + currentValue.quantity, 0
    );
       
    return(
        <div className='cart-icon-container' onClick={toggleSetHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{totalItemsInCart}</span>
        </div>
    )
}
export default CartIcon;