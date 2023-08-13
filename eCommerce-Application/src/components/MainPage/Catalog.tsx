import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Catalog(): JSX.Element {
    const [, setIsHover] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent): void => {
        const hoverElement = event.target as HTMLDivElement;

        setIsHover(true);

        const catalogAccent = document.querySelector(
            `.catalog__accent[data-num="${hoverElement.dataset.num}"]`
        );

        catalogAccent?.classList.add('active');
    };

    const handleMouseLeave = (event: React.MouseEvent): void => {
        const hoverElement = event.target as HTMLDivElement;

        setIsHover(false);

        const catalogAccent = document.querySelector(
            `.catalog__accent[data-num="${hoverElement.dataset.num}"]`
        );

        catalogAccent?.classList.remove('active');
    };

    return (
        <section className="catalog">
            <div className="catalog__container">
                <h2 className="catalog__title">Каталог</h2>
                <div className="catalog__items">
                    <div
                        className="catalog__item catalog__item--1"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/store" data-num="1">
                            <span className="sr-only">Сувениры</span>
                        </Link>
                        <h3 className="catalog__item-title">Сувениры</h3>
                    </div>
                    <div
                        className="catalog__item catalog__item--2"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/store" data-num="2">
                            <span className="sr-only">Выбрать космотур</span>
                        </Link>
                        <h3 className="catalog__item-title">
                            Выбрать космотур
                        </h3>
                    </div>
                    <div
                        className="catalog__item catalog__item--3"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/store" data-num="3">
                            <span className="sr-only">Выбрать номер</span>
                        </Link>
                        <h3 className="catalog__item-title">Выбрать номер</h3>
                    </div>
                </div>
                <div className="catalog__decoration">
                    <div className="catalog__accent" data-num="1">
                        <span className="sr-only">1</span>
                    </div>
                    <div className="catalog__accent" data-num="2">
                        <span className="sr-only">2</span>
                    </div>
                    <div className="catalog__accent" data-num="3">
                        <span className="sr-only">3</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Catalog;
