import { Cart } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

function PriceBlock(props: {
    activeCart: Cart | null;
    // setActiveCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}): JSX.Element {
    const { activeCart } = props;
    const [priceWithoutDiscount, setPriceWithoutDiscount] = useState<
        number | ''
    >('');
    const [discount, setDiscount] = useState<number | ''>('');

    useEffect(() => {
        const newPriceWithoutDiscount: number | '' = activeCart
            ? activeCart.lineItems.reduce((acc, cur) => {
                  return (
                      acc + (cur.price.value.centAmount * cur.quantity) / 100
                  );
              }, 0)
            : '';
        setPriceWithoutDiscount(newPriceWithoutDiscount);
        setDiscount(
            newPriceWithoutDiscount &&
                typeof newPriceWithoutDiscount === 'number' &&
                activeCart
                ? newPriceWithoutDiscount -
                      activeCart.totalPrice.centAmount / 100
                : ''
        );
    }, [activeCart]);

    return (
        <section className="price-section">
            <div className="price-block">
                <div className="price">
                    <h2 className="price__type">Сумма заказа</h2>
                    <h2 className="price__value">
                        {`$ ${priceWithoutDiscount?.toLocaleString('ru')}.00`}
                    </h2>
                </div>
                <div className="price">
                    <h2 className="price__type">Скидка</h2>
                    <h2 className="price__value">
                        {`$ ${discount.toLocaleString('ru')}.00`}
                    </h2>
                </div>
                <div className="price-total">
                    <h2>
                        Итого
                        <br />
                        со скидкой
                    </h2>
                    <h2 className="price-total__value">
                        {activeCart
                            ? `$ ${(
                                  activeCart.totalPrice.centAmount / 100
                              ).toLocaleString('ru')}.00`
                            : ''}
                    </h2>
                </div>
                <div className="promocode">
                    <div>
                        <p className="promocode__label">Ввести промокод</p>
                        <input className="promocode__input" type="text" />
                    </div>

                    <button className="btn cart__btn" type="button">
                        Применить
                    </button>
                </div>
            </div>
            <button className="btn cart__btn cart__btn_submit" type="button">
                Оформить заказ
            </button>
        </section>
    );
}

export default PriceBlock;
