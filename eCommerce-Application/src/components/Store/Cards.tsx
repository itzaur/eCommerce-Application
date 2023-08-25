import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import cartIcon from '../../assets/images/cart-icon.png';
import favouriteIcon from '../../assets/images/favourite-icon.png';

function Cards({ cards }: Record<'cards', ProductProjection[]>): JSX.Element {
    // console.log(cards);
    return (
        <div className="cards">
            {cards.map((card, i: number) => (
                <Link key={i} to={`./${card.key}`}>
                    <div key={i} className="card">
                        <img
                            className="card__img"
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
                        <div className="card__description">
                            <div className="card__details">
                                {card.masterVariant.prices && (
                                    <div className="card__price">
                                        {card.masterVariant.prices[0]
                                            .discounted ? (
                                            <>
                                                <h2 className="promotion-price">
                                                    {(
                                                        card.masterVariant
                                                            .prices[0]
                                                            .discounted.value
                                                            .centAmount / 100
                                                    ).toLocaleString('ru')}{' '}
                                                    $
                                                </h2>

                                                <h3 className="old-price">
                                                    <div className="cross-price" />
                                                    {(
                                                        card.masterVariant
                                                            .prices[0].value
                                                            .centAmount / 100
                                                    ).toLocaleString('ru')}{' '}
                                                </h3>
                                            </>
                                        ) : (
                                            <h2>
                                                {(
                                                    card.masterVariant.prices[0]
                                                        .value.centAmount / 100
                                                ).toLocaleString('ru')}{' '}
                                                $
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
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Cards;
