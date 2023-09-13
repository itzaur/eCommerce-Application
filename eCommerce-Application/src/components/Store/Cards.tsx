import React, { MouseEvent, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { addNewProductInCartOrUpdateQuantity } from '../../commercetools/updateCart';

import cartIcon from '../../assets/images/cart-icon.png';
import cartIconInactive from '../../assets/images/cart-icon-inactive.png';
import favouriteIcon from '../../assets/images/favourite-icon.png';

function Cards({ cards }: Record<'cards', ProductProjection[]>): JSX.Element {
    const currentCardRef = useRef<Element | null>(null);
    const [buttonDescriptionTexcontent, setButtonDescriptionTexcontent] =
        useState('Показать описание ▼');
    const [productsIdInCart, setProductIdInCart] = useState<string[]>([]);
    const cartFirst = localStorage.getItem('activeCart')
        ? JSON.parse(localStorage.getItem('activeCart') as string)
        : null;

    const [activeCart, setActiveCart] = useState<Cart | null>(cartFirst);

    const scrollToTop = (event: React.MouseEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement;
        if (target.className.includes('btn')) return;

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    function showHideDescription(e: MouseEvent): void {
        e.preventDefault();
        if (e.target instanceof HTMLElement) {
            currentCardRef.current = e.target.previousElementSibling;

            currentCardRef.current?.classList.toggle('card__description_open');

            setButtonDescriptionTexcontent(
                buttonDescriptionTexcontent === 'Показать описание ▼'
                    ? 'Скрыть описание ▲'
                    : 'Показать описание ▼'
            );
        }
    }
    function addNewProductInCartDOM(e: MouseEvent, cardId: string): void {
        e.preventDefault();

        addNewProductInCartOrUpdateQuantity(cardId, activeCart, 'new', 1).then(
            (data) => {
                if (data) setActiveCart(data);
            }
        );
    }

    useEffect(() => {
        const tempIDs = activeCart?.lineItems
            ? activeCart.lineItems.map((product) => product.productId)
            : [];
        setProductIdInCart(tempIDs);
    }, [activeCart]);

    return (
        <div className="cards">
            {cards.map((card, i: number) => (
                <Link key={card.id} to={`./${card.key}`} onClick={scrollToTop}>
                    <div key={i} className="card" id={card.key}>
                        <figure className="card__img">
                            {card.masterVariant.images && (
                                <img
                                    src={card.masterVariant.images[0].url}
                                    alt={card.masterVariant.images[0].label}
                                />
                            )}
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
                                    <button
                                        type="button"
                                        disabled={
                                            !!productsIdInCart.includes(card.id)
                                        }
                                        onClick={(e): void => {
                                            addNewProductInCartDOM(e, card.id);
                                        }}
                                    >
                                        <img
                                            src={
                                                productsIdInCart.includes(
                                                    card.id
                                                )
                                                    ? cartIconInactive
                                                    : cartIcon
                                            }
                                            alt="cart-icon"
                                        />
                                    </button>
                                    <button type="button">
                                        <img
                                            src={favouriteIcon}
                                            alt="favourite-icon"
                                        />
                                    </button>
                                </div>
                            </div>
                            <h2 className="card__title">
                                {card.name['ru-RU']}
                            </h2>
                            <div className="card__paragraph">
                                <p className="card__description">
                                    {card?.description?.['ru-RU'] || ''}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn card__description-btn"
                                onClick={(e): void => {
                                    showHideDescription(e);
                                }}
                            >
                                {buttonDescriptionTexcontent}
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;
