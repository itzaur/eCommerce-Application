import React from 'react';
import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import cartIcon from '../../assets/images/cart-icon.png';
import favouriteIcon from '../../assets/images/favourite-icon.png';

function Cards({ cards }: Record<'cards', ProductProjection[]>): JSX.Element {
    const scrollToTop = (event: React.MouseEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement;
        if (target.className.includes('btn')) return;

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div className="cards">
            {cards.map((card, i: number) => (
                <Link key={i} to={`./${card.key}`} onClick={scrollToTop}>
                    <div key={i} className="card" id={card.key}>
                        <figure className="card__img">
                            <img
                                src={
                                    card.masterVariant.images
                                        ? card.masterVariant.images[0].url
                                        : ''
                                }
                                alt={
                                    card.masterVariant.images
                                        ? card.masterVariant.images[0].label
                                        : ''
                                }
                            />
                        </figure>
                        <div className="card__content">
                            <div className="card__details">
                                {card.masterVariant.prices && (
                                    <div className="card__price">
                                        {card.masterVariant.prices[0]
                                            .discounted ? (
                                            <>
                                                <h2 className="promotion-price">
                                                    ${' '}
                                                    {(+(
                                                        card.masterVariant
                                                            .prices[0]
                                                            .discounted.value
                                                            .centAmount / 100
                                                    ).toFixed(
                                                        0
                                                    )).toLocaleString('ru')}
                                                    .00
                                                </h2>

                                                <h3 className="old-price">
                                                    <div className="cross-price" />
                                                    ${' '}
                                                    {(+(
                                                        card.masterVariant
                                                            .prices[0].value
                                                            .centAmount / 100
                                                    ).toFixed(
                                                        0
                                                    )).toLocaleString('ru')}
                                                    .00
                                                </h3>
                                            </>
                                        ) : (
                                            <h2>
                                                ${' '}
                                                {(+(
                                                    card.masterVariant.prices[0]
                                                        .value.centAmount / 100
                                                ).toFixed(0)).toLocaleString(
                                                    'ru'
                                                )}
                                                .00
                                            </h2>
                                        )}
                                    </div>
                                )}
                                <div className="card__icons">
                                    <img src={cartIcon} alt="cart-icon" />
                                    <img
                                        src={favouriteIcon}
                                        alt="favourite-icon"
                                    />
                                </div>
                            </div>
                            <h2 className="card__title">
                                {card.name['ru-RU']}
                            </h2>
                            <div className="card__paragraph">
                                <p className="card__description">
                                    {card.description
                                        ? card.description['ru-RU']
                                        : ''}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn card__description-btn"
                                onClick={(e): void => {
                                    e.preventDefault();
                                    if (card.key) {
                                        document
                                            .querySelector(
                                                `#${card.key} .card__paragraph`
                                            )
                                            ?.classList.toggle(
                                                'card__description_open'
                                            );
                                        (e.target as HTMLElement).textContent =
                                            (e.target as HTMLElement)
                                                .textContent ===
                                            'Показать описание ▼'
                                                ? 'Скрыть описание ▲'
                                                : 'Показать описание ▼';
                                    }
                                }}
                            >
                                Показать описание ▼
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;
