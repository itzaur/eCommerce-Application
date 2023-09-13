import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import { addNewProductInCartOrUpdateQuantity } from '../../commercetools/updateCart';

function CartProducts(props: {
    activeCart: Cart | null;
    setActiveCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}): JSX.Element {
    const { activeCart, setActiveCart } = props;
    const [cartLoading, setCartLoading] = useState(false);

    function changeQuantity(cardId: string, newValue: number): void {
        setCartLoading(true);
        addNewProductInCartOrUpdateQuantity(
            cardId,
            activeCart,
            'update',
            newValue
        )
            .then((data) => {
                setActiveCart(data);
            })
            .finally(() => {
                setCartLoading(false);
            });
    }

    return (
        <div className="cart__products">
            <div className="purchases__header">
                <button type="button">Очистить корзину</button>
                <h3>Товар</h3>
                <h3>Цена</h3>
                <h3>Цена со скидкой</h3>
            </div>
            <div className="purchases__items">
                {activeCart &&
                    activeCart.lineItems.map((purchase) => {
                        return (
                            <div className="purchase" key={purchase.id}>
                                <div className="purchase__img-block">
                                    <button
                                        className="btn purchase__btn"
                                        type="button"
                                        onClick={(): void => {
                                            changeQuantity(
                                                purchase.productId,
                                                0
                                            );
                                        }}
                                    >
                                        ✕
                                    </button>

                                    {purchase.variant.images && (
                                        <Link
                                            to={`/store/${purchase.productKey}`}
                                        >
                                            <img
                                                className="purchase__img"
                                                src={
                                                    purchase.variant.images[0]
                                                        .url
                                                }
                                                alt={
                                                    purchase.variant.images[0]
                                                        .label
                                                }
                                            />
                                        </Link>
                                    )}
                                </div>
                                <div className="purchase__name-block">
                                    <h2 className="purchase__name">
                                        {purchase.name['ru-RU']}
                                    </h2>
                                    <div className="purchase__quantity">
                                        <button
                                            className="btn purchase__btn"
                                            type="button"
                                            disabled={!!cartLoading}
                                            onClick={(): void => {
                                                const newValue =
                                                    purchase.quantity - 1;
                                                changeQuantity(
                                                    purchase.productId,
                                                    newValue
                                                );
                                            }}
                                        >
                                            —
                                        </button>
                                        <input
                                            type="number"
                                            readOnly
                                            className="quantity__input"
                                            value={purchase.quantity}
                                            disabled={false}
                                        />
                                        <button
                                            className="btn purchase__btn"
                                            type="button"
                                            disabled={!!cartLoading}
                                            onClick={(): void => {
                                                const newValue =
                                                    purchase.quantity + 1;
                                                changeQuantity(
                                                    purchase.productId,
                                                    newValue
                                                );
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <h2 className="purchase__price">
                                    {`$ ${(
                                        (purchase.price.value.centAmount *
                                            purchase.quantity) /
                                        100
                                    ).toLocaleString('ru')}.00`}
                                </h2>
                                {purchase.price.discounted && (
                                    <h2 className="purchase__price purchase__price_discounted">
                                        {`$ ${(
                                            (purchase.price.discounted.value
                                                .centAmount *
                                                purchase.quantity) /
                                            100
                                        ).toLocaleString('ru')}.00`}
                                    </h2>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default CartProducts;
