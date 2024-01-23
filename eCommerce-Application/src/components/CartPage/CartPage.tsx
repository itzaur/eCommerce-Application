import gsap from 'gsap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import { Header } from '../Store';
import Transition from '../Transition/Transition';
import CartProducts from './CartProducts';
import PricesBlock from './PriceBlock';
import NoCart from './NoCart';
import { getActiveCart } from '../../commercetools/updateCart';
import { Footer } from '../MainPage';

function CartPage(): JSX.Element {
    const root = document.querySelector('main');
    if (root) root.id = 'cart';

    const [activeCart, setActiveCart] = useState<Cart | null>(null);
    const [pageLoaded, setPageloaded] = useState(false);
    const timeline = gsap.timeline();

    useEffect(() => {
        getActiveCart(true)
            .then((data) => {
                setActiveCart(data);
                setPageloaded(true);
            })
            .catch(() => {
                // setErrorBodyDOM(err);
            });
    }, [pageLoaded, setActiveCart]);

    return (
        <>
            <Transition timeline={timeline} />
            <Header withSearchValue={false} />
            <section className="cart__main">
                <ul className="bread-crumbs">
                    <li>
                        <Link to="/">Главная /</Link>
                    </li>
                    <li>
                        <Link to="/cart">Корзина</Link>
                    </li>
                </ul>

                <button
                    className="product__back"
                    type="button"
                    onClick={(): void => {
                        window.history.back();
                    }}
                >
                    <span />
                    Назад
                </button>

                {activeCart && activeCart.lineItems.length ? (
                    <div className="cart__content">
                        <CartProducts
                            activeCart={activeCart}
                            setActiveCart={setActiveCart}
                        />
                        <PricesBlock
                            activeCart={activeCart}
                            setActiveCart={setActiveCart}
                        />
                    </div>
                ) : (
                    ''
                )}

                {(!activeCart || !activeCart.lineItems.length) && <NoCart />}
            </section>
            <Footer />
        </>
    );
}

export default CartPage;
