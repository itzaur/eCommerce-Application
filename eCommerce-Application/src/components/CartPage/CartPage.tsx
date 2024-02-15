import gsap from 'gsap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import ClipLoader from 'react-spinners/RingLoader';
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
    const [serverError, setServerError] = useState('');
    const timeline = gsap.timeline();

    useEffect(() => {
        getActiveCart(true)
            .then((data) => {
                if (data !== undefined) setActiveCart(data);
                setPageloaded(true);
            })
            .catch((err: Error) => {
                setServerError(err.message);
            });
    }, []);

    if (serverError) throw new Error(serverError);

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
                {!pageLoaded && (
                    <ClipLoader
                        color="#4fe1e3"
                        size={150}
                        className="store__loader"
                    />
                )}
                {pageLoaded &&
                    (activeCart && activeCart.lineItems.length ? (
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
                        <NoCart />
                    ))}
            </section>
            <Footer />
        </>
    );
}

export default CartPage;
