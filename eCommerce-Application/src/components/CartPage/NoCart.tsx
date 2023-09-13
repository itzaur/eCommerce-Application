import { Link } from 'react-router-dom';
import noCartImg from '../../assets/images/no-cart.png';

function NoCart(): JSX.Element {
    return (
        <section className="no-cart">
            <p className="no-cart__p">Где-то грустит один робокотик, пока</p>
            <h2 className="no-cart__h2">ваша корзина пуста</h2>
            <img src={noCartImg} alt="no-cart" className="no-cart__img" />
            <p className="no-cart__p">Скорее начните покупки!</p>
            <Link to="/store">
                <button type="button" className="btn cart__btn">
                    Перейти в магазин
                </button>
            </Link>
        </section>
    );
}

export default NoCart;
