import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import { Header } from '../Store';
import CartProducts from './CartProducts';
import PricesBlock from './PriceBlock';
import NoCart from './NoCart';
import { getActiveCart } from '../../commercetools/updateCart';
import { Footer } from '../MainPage';

function CartPage(): JSX.Element {
    const [activeCart, setActiveCart] = useState<Cart | null>(null);
    const [pageLoaded, setPageloaded] = useState(false);

    useEffect(() => {
        getActiveCart().then((data) => {
            if (data) setActiveCart(data);
            setPageloaded(true);
        });
    }, [pageLoaded, setActiveCart]);

    return (
        <>
            <Header setSearchValue={undefined} withSearchValue={false} />
            <section className="cart__main">
                <ul className="bread-crumbs">
                    <li>
                        <Link to="/">Главная /</Link>
                    </li>
                    <li>
                        <Link to="/cart">Корзина</Link>
                    </li>
                </ul>

                {activeCart && activeCart.lineItems.length ? (
                    <div className="cart__content">
                        <CartProducts
                            activeCart={activeCart}
                            setActiveCart={setActiveCart}
                        />
                        <PricesBlock
                            activeCart={activeCart}
                            // setActiveCart={setActiveCart}
                        />
                    </div>
                ) : (
                    ''
                )}

                {!activeCart || (!activeCart.lineItems.length && <NoCart />)}
            </section>
            <Footer />
        </>
    );
}

export default CartPage;
