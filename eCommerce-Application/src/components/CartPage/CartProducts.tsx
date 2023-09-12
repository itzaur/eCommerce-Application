import { Cart } from '@commercetools/platform-sdk';

function CartProducts(props: {
    activeCart: Cart | null;
    // setActiveCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}): JSX.Element {
    const { activeCart } = props;

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
                                    >
                                        ✕
                                    </button>
                                    {purchase.variant.images && (
                                        <img
                                            className="purchase__img"
                                            src={purchase.variant.images[0].url}
                                            alt={
                                                purchase.variant.images[0].label
                                            }
                                        />
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
                                        >
                                            —
                                        </button>
                                        <input
                                            type="number"
                                            className="quantity__input"
                                        />
                                        <button
                                            className="btn purchase__btn"
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <h2 className="purchase__price">
                                    {`$ ${(
                                        purchase.price.value.centAmount / 100
                                    ).toLocaleString('ru')}.00`}
                                </h2>
                                {purchase.price.discounted && (
                                    <h2 className="purchase__price purchase__price_discounted">
                                        {`$ ${(
                                            purchase.price.discounted.value
                                                .centAmount / 100
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
