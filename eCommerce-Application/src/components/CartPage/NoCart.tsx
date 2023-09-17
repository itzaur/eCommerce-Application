import { Link } from 'react-router-dom';
import noCartImg from '../../assets/images/no-cart.png';

function NoCart(): JSX.Element {
    return (
        <section className="no-cart">
            <p className="no-cart__subtitle">
                Где-то грустит один робокотик, пока
            </p>
            <h2 className="no-cart__title">ваша корзина пуста</h2>
            <img className="no-cart__img" src={noCartImg} alt="no-cart" />
            <p className="no-cart__subtitle">Скорее начните покупки!</p>
            <Link to="/store">
                <button type="button" className="btn cart__btn">
                    Перейти в магазин
                </button>
            </Link>
        </section>
    );
}

export default NoCart;
