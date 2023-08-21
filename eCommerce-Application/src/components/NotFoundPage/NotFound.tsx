import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from './Modal';
import ship from '../../assets/images/ship.svg';
import notFound from '../../assets/images/404.svg';
import star from '../../assets/images/star.png';
import ellipse from '../../assets/images/ellipse.png';

function NotFound(): JSX.Element {
    const [modalActive, setModalActive] = useState(false);

    return (
        <section className="fail">
            <div className="fail__ship">
                <img src={ship} alt="ship" />
            </div>
            <div className="fail__title">
                <img src={notFound} alt="404" />
            </div>
            <div className="fail__inscription">
                <h2>Упс...</h2>
            </div>
            <div className="fail__subinscription">
                <h2>Кажется, Мы</h2>
                <h3>Улетели Без Вас</h3>
                <div className="line" data-name="line1">
                    <span className="sr-only">line1</span>
                </div>
                <div className="line" data-name="line2">
                    <span className="sr-only">line2</span>
                </div>
                <div className="line" data-name="line3">
                    <span className="sr-only">line3</span>
                </div>
            </div>
            <div className="fail__subtitle">
                <h2>Страница не найдена</h2>
                <p>
                    Запрашиваемая Вами страница не существует или была удалена.
                </p>
            </div>
            <div className="fail__links">
                <Link to="/">Перейти на главную страницу</Link>
                <Link to="/store">Перейти в магазин</Link>
                <button
                    className="btn-modal"
                    onClick={(): void => setModalActive(true)}
                    type="button"
                >
                    Переименовать твиттер
                </button>
                <Modal active={modalActive} setActive={setModalActive}>
                    Увы... Даже мы не в силах это сделать. Честно.
                </Modal>
            </div>
            <figcaption className="fail__star" data-num="1">
                <img src={star} alt="star" />
            </figcaption>
            <figcaption className="fail__star" data-num="2">
                <img src={star} alt="star" />
            </figcaption>
            <figcaption className="fail__star" data-num="3">
                <img src={star} alt="star" />
            </figcaption>
            <figcaption className="fail__star" data-num="4">
                <img src={ellipse} alt="star" />
            </figcaption>
            <figcaption className="fail__star" data-num="5">
                <img src={ellipse} alt="star" />
            </figcaption>
            <figcaption className="fail__star" data-num="6">
                <img src={ellipse} alt="star" />
            </figcaption>
            <figcaption className="fail__star" data-num="7">
                <img src={ellipse} alt="star" />
            </figcaption>
        </section>
    );
}

export default NotFound;
