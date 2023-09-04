import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import slide1 from '../../assets/images/slide1.png';
import arrow from '../../assets/images/arrow.png';
import userLogo from '../../assets/images/user.png';

function Info(): JSX.Element {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user') as string)
    );

    return (
        <>
            <div className="home__info">
                <div className="home__btns">
                    {!user && (
                        <button className="btn" type="button">
                            <Link to="/login">Войти</Link>
                        </button>
                    )}
                    {!user && (
                        <button className="btn" type="button">
                            <Link to="/registration">Регистрация</Link>
                        </button>
                    )}
                    {user && (
                        <>
                            <div className="user-info">
                                <img src={userLogo} alt="userIcon" />
                                <h2>{user.salutation}</h2>
                            </div>
                            <button className="btn" type="button">
                                <Link to="/profile">Профиль</Link>
                            </button>
                            <button
                                className="btn btn--exit"
                                type="button"
                                onClick={(): void => {
                                    localStorage.clear();
                                    setUser(null);
                                }}
                                onKeyDown={(): void => {
                                    localStorage.clear();
                                    setUser(null);
                                }}
                            >
                                <span>Выйти</span>
                            </button>
                        </>
                    )}
                    <button className="btn" type="button">
                        <Link to="/store">Перейти в магазин</Link>
                    </button>
                    <button className="btn" type="button">
                        <Link to="/about">О нас</Link>
                    </button>
                    <figcaption className="arrow">
                        <img src={arrow} alt="arrow" />
                    </figcaption>
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
