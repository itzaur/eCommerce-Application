import { Link, Outlet } from 'react-router-dom';
import slide1 from '../../assets/images/slide1.png';

function Info(): JSX.Element {
    return (
        <>
            <div className="home__info">
                <div className="home__btns">
                    <button className="btn" type="button">
                        <Link to="/login">Войти</Link>
                    </button>
                    <button className="btn" type="button">
                        <Link to="/registration">Регистрация</Link>
                    </button>
                    <button className="btn" type="button">
                        <Link to="/store">Перейти в магазин</Link>
                    </button>
                    <button className="btn" type="button">
                        <Link to="/about">О нас</Link>
                    </button>
                </div>
                <div className="home__text">
                    <h2 className="home__text-title">Кто мы?</h2>
                    <p className="home__text-subtitle">
                        Надоело дышать вулканическом пеплом Земли? А пустые
                        шезлонги приходится бронировать на год вперед?
                    </p>
                    <p className="home__text-accent">
                        <span>ВЫХОД ЕСТЬ!</span> <br /> Космическая Одиссея
                        [4165] – это то, что Вам нужно!
                    </p>
                </div>
            </div>
            <div className="home__info">
                <div className="home__slides">
                    <figure>
                        <img src={slide1} alt="slide" />
                    </figure>
                </div>
                <div className="home__text">
                    <h2 className="home__text-title">Что мы предлагаем?</h2>
                    <p className="home__text-subtitle">
                        Неизгладимые впечатления и море эмоций!
                    </p>
                    <p className="home__text-subtitle">
                        Устройте себе межгалактические каникулы, выбрав один из
                        наших увлекательных космотуров.
                    </p>
                    <p className="home__text-subtitle">
                        Наслаждайтесь полетом в комфортабельных номерах, а
                        приятным напоминанием о Вашем путешествии станут наши
                        уникальные сувениры, которые Вы можете приобрести в
                        нашем космомагазине!
                    </p>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Info;
