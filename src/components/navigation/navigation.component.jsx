import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { hidden } = useContext(CartContext);
    const signOutHandler = async () => {
       await signOutUser();
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    { currentUser ? (
                        <span className='nav-link' onClick={signOutHandler}> SIGN OUT </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />   
                </div>
                {!hidden && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;