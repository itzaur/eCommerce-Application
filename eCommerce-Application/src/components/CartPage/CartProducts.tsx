import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from '@commercetools/platform-sdk';
import { addNewProductInCartOrUpdateQuantity } from '../../commercetools/updateCart';
import { setErrorBodyDOM } from '../../utils/constants';

function CartProducts(props: {
    activeCart: Cart | null;
    setActiveCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}): JSX.Element {
    const { activeCart, setActiveCart } = props;
    const [cartLoading, setCartLoading] = useState(false);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

    function changeQuantity(cardId: string, newValue: number): void {
        setCartLoading(true);
        addNewProductInCartOrUpdateQuantity({
            cartData: activeCart,
            mode: 'update',
            cardId,
            quantity: newValue,
            firstFunctionCall: true,
        })
            .then((data) => {
                setActiveCart(data);
            })
            .catch((err) => {
                setErrorBodyDOM(err);
            })
            .finally(() => {
                setCartLoading(false);
            });
    }
    function removeCart(): void {
        addNewProductInCartOrUpdateQuantity({
            cartData: activeCart,
            mode: 'remove',
            cardId: '',
            quantity: 0,
            firstFunctionCall: true,
        })
            .then((data) => {
                setActiveCart(data);
                setModalConfirmVisible(false);
            })
            .catch((err) => {
                setErrorBodyDOM(err);
            });
    }

    return (
        <>
            <div className="cart__products">
                <div className="purchases__header">
                    <button
                        type="button"
                        onClick={(): void => {
                            setModalConfirmVisible(true);
                        }}
                    >
                        Очистить корзину
                    </button>
                    <p>Товар</p>
                    <p>Цена</p>
                    <p>Цена со скидкой</p>
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
                                                        purchase.variant
                                                            .images[0].url
                                                    }
                                                    alt={
                                                        purchase.variant
                                                            .images[0].label
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
                                    {!purchase.price.discounted && (
                                        <div className="purchase__price-block">
                                            <p className="purchase__price-type">
                                                Цена за единицу:
                                            </p>
                                            <h2 className="purchase__price">
                                                {`$ ${Math.round(
                                                    purchase.price.value
                                                        .centAmount / 100
                                                ).toLocaleString('ru')}.00`}
                                            </h2>
                                            <p className="purchase__price-type">
                                                Стоимость:
                                            </p>
                                            <h2 className="purchase__price">
                                                {`$ ${Math.round(
                                                    (purchase.price.value
                                                        .centAmount *
                                                        purchase.quantity) /
                                                        100
                                                ).toLocaleString('ru')}.00`}
                                            </h2>
                                        </div>
                                    )}
                                    {purchase.price.discounted && (
                                        <div className="purchase__price-block">
                                            <p className="purchase__price-type">
                                                Цена за единицу:
                                            </p>
                                            <h2 className="purchase__price">
                                                {`$ ${Math.round(
                                                    purchase.price.discounted
                                                        .value.centAmount / 100
                                                ).toLocaleString('ru')}.00`}
                                            </h2>
                                            <p className="purchase__price-type">
                                                Стоимость:
                                            </p>
                                            <h2 className="purchase__price">
                                                {`$ ${Math.round(
                                                    (purchase.price.discounted
                                                        .value.centAmount *
                                                        purchase.quantity) /
                                                        100
                                                ).toLocaleString('ru')}.00`}
                                            </h2>
                                        </div>
                                    )}
                                    {purchase.discountedPricePerQuantity
                                        .length ? (
                                        <div className="purchase__price purchase__price_discounted">
                                            <div className="purchase__price-block">
                                                <p className="purchase__price-type">
                                                    Цена за единицу:
                                                </p>
                                                <h2>
                                                    {`$ ${Math.round(
                                                        purchase
                                                            .discountedPricePerQuantity[0]
                                                            .discountedPrice
                                                            .value.centAmount /
                                                            100
                                                    ).toLocaleString('ru')}.00`}
                                                </h2>
                                                <p className="purchase__price-type">
                                                    Стоимость:
                                                </p>
                                                <h2>
                                                    {`$ ${Math.round(
                                                        (purchase
                                                            .discountedPricePerQuantity[0]
                                                            .discountedPrice
                                                            .value.centAmount /
                                                            100) *
                                                            purchase.quantity
                                                    ).toLocaleString('ru')}.00`}
                                                </h2>
                                            </div>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
            {modalConfirmVisible && (
                <div className="modal modal_confirm active">
                    <div className="modal_registration">
                        <h4>
                            Вы уверены, что хотите огорчить робокотика и всё
                            удалить?
                        </h4>

                        <div className="flex-2-col">
                            <button
                                type="button"
                                className="btn btn--basket"
                                onClick={(): void => {
                                    removeCart();
                                }}
                            >
                                Да, удаляем, я равнодушен к робокотикам!
                            </button>
                            <button
                                type="button"
                                className="btn btn--basket"
                                onClick={(): void => {
                                    setModalConfirmVisible(false);
                                }}
                            >
                                Нет, робокотик - весомый аргумент, оставляем!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CartProducts;
