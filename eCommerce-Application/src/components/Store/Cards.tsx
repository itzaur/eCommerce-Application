import { MouseEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { CircleLoader } from 'react-spinners';
import { addNewProductInCartOrUpdateQuantity } from '../../commercetools/updateCart';
import { serverErrorMessage, setErrorBodyDOM } from '../../utils/constants';

import cartIcon from '../../assets/images/cart-icon.png';
import cartIconInactive from '../../assets/images/cart-icon-inactive.png';
import favouriteIcon from '../../assets/images/favourite-icon.png';

function Cards({ cards }: Record<'cards', ProductProjection[]>): JSX.Element {
    const currentCardRef = useRef<Element | null>(null);
    const [buttonDescriptionOpenId, setButtonDescriptionOpenId] = useState<
        string[]
    >([]);

    const [activeCart, setActiveCart] = useState<Cart | null>(
        localStorage.getItem('activeCart')
            ? JSON.parse(localStorage.getItem('activeCart') as string)
            : null
    );
    const [cartLoading, setCartLoading] = useState(false);
    const [cartLoadingElement, setCartLoadingElement] = useState('');

    const scrollToTop = (event: React.MouseEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement;

        if (
            target.className.includes('btn') ||
            target.className.includes('card__icon')
        )
            return;

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    function showHideDescription(
        e: MouseEvent,
        cardId: string | undefined
    ): void {
        e.preventDefault();
        if (e.target instanceof HTMLElement && cardId) {
            currentCardRef.current = e.target.previousElementSibling;
            currentCardRef.current?.classList.toggle('card__description_open');

            if (
                currentCardRef.current?.classList.contains(
                    'card__description_open'
                )
            ) {
                setButtonDescriptionOpenId([
                    ...buttonDescriptionOpenId,
                    cardId,
                ]);
            } else {
                const tempArr = [...buttonDescriptionOpenId];
                tempArr.splice(tempArr.indexOf(cardId), 1);
                setButtonDescriptionOpenId(tempArr);
            }
        }
    }

    function addNewProductInCartDOM(e: MouseEvent, cardId: string): void {
        e.preventDefault();
        if (e.target instanceof HTMLElement && e.target.parentElement) {
            setCartLoadingElement(e.target.parentElement.id);
            setCartLoading(true);
        }

        addNewProductInCartOrUpdateQuantity({
            cartData: activeCart,
            mode: 'new',
            cardId,
            quantity: 1,
            firstFunctionCall: true,
        })
            .then((data) => {
                if (data) setActiveCart(data);
            })
            .catch((err) => {
                if (
                    err instanceof Error &&
                    err.message === serverErrorMessage
                ) {
                    setErrorBodyDOM(err);
                }
            })
            .finally(() => {
                setCartLoadingElement('');
                setCartLoading(false);
            });
    }

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
                                        id={`btn-cart-${card.key}`}
                                        disabled={activeCart?.lineItems
                                            .map((product) => product.productId)
                                            .includes(card.id)}
                                        onClick={(e): void => {
                                            addNewProductInCartDOM(e, card.id);
                                        }}
                                    >
                                        {cartLoadingElement !==
                                            `btn-cart-${card.key}` && (
                                            <img
                                                className="card__icon"
                                                src={
                                                    activeCart?.lineItems
                                                        .map(
                                                            (product) =>
                                                                product.productId
                                                        )
                                                        .includes(card.id)
                                                        ? cartIconInactive
                                                        : cartIcon
                                                }
                                                alt="cart-icon"
                                            />
                                        )}
                                        {cartLoadingElement ===
                                            `btn-cart-${card.key}` && (
                                            <CircleLoader
                                                color="hsl(181, 73%, 60%)"
                                                loading={cartLoading}
                                                size={40}
                                            />
                                        )}
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
                                    showHideDescription(e, card.key);
                                }}
                            >
                                {card.key &&
                                buttonDescriptionOpenId.includes(card.key)
                                    ? 'Скрыть описание'
                                    : 'Показать описание'}
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;
