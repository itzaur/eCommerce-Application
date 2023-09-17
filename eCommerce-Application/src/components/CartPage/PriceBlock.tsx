import { Cart } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { setErrorBodyDOM } from '../../utils/constants';
import {
    addNewProductInCartOrUpdateQuantity,
    applyDiscount,
} from '../../commercetools/updateCart';
import orderCartImg from '../../assets/images/order-cart.png';
import orderDoneImg from '../../assets/images/order-done.png';

function PriceBlock(props: {
    activeCart: Cart | null;
    setActiveCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}): JSX.Element {
    const { activeCart, setActiveCart } = props;
    const [priceWithoutDiscount, setPriceWithoutDiscount] = useState<
        number | ''
    >('');
    const [discount, setDiscount] = useState<number | ''>('');
    const [promocode, setPromocode] = useState('');
    const [promocodeSuccess, setPromocodeSuccess] = useState(false);
    const [promocodeErrorMessage, setPromocodeErrorMessage] = useState('');
    const [orderDone, setOrderDone] = useState(false);

    useEffect(() => {
        const newPriceWithoutDiscount: number | '' = activeCart
            ? activeCart.lineItems.reduce((acc, cur) => {
                  const variantPrice = cur.price?.discounted
                      ? cur.price?.discounted?.value.centAmount
                      : cur.price?.value.centAmount;

                  if (variantPrice) {
                      return Math.round(
                          acc + (variantPrice * cur.quantity) / 100
                      );
                  }
                  return 0;
              }, 0)
            : '';
        setPriceWithoutDiscount(newPriceWithoutDiscount);
        setDiscount(
            newPriceWithoutDiscount &&
                typeof newPriceWithoutDiscount === 'number' &&
                activeCart
                ? newPriceWithoutDiscount -
                      Math.round(activeCart.totalPrice.centAmount / 100)
                : ''
        );
    }, [activeCart]);

    function applyPromocode(): void {
        if (promocode && activeCart)
            applyDiscount(activeCart, promocode)
                .then((data) => {
                    if (data) {
                        setActiveCart(data);
                        setPromocodeSuccess(true);
                        setTimeout(() => {
                            setPromocodeSuccess(false);
                        }, 2000);
                    }
                })
                .catch((e: Error) => {
                    setPromocodeErrorMessage(e.message);
                    setTimeout(() => {
                        setPromocodeErrorMessage('');
                    }, 2000);
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
                if (data !== undefined) setActiveCart(data);
            })
            .catch((err) => {
                setErrorBodyDOM(err);
            });
    }

    function newOrderDone(): void {
        setOrderDone(true);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            removeCart();
            document.body.style.overflow = 'auto';
            setOrderDone(false);
        }, 2000);
    }

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
                            ? `$ ${Math.round(
                                  activeCart.totalPrice.centAmount / 100
                              ).toLocaleString('ru')}.00`
                            : ''}
                    </h2>
                </div>
                <div className="promocode">
                    <div className="promocode__title">
                        <p className="promocode__label">Ввести промокод</p>
                        <input
                            className="promocode__input"
                            type="text"
                            onChange={(e): void => setPromocode(e.target.value)}
                        />
                        {promocodeSuccess && (
                            <p className="promocode_success">
                                Промокод применён!
                            </p>
                        )}
                        {promocodeErrorMessage && (
                            <p className="error-message error-message_static">
                                {promocodeErrorMessage}
                            </p>
                        )}
                    </div>
                    <div />
                    <button
                        className="btn cart__btn"
                        type="button"
                        onClick={(): void => {
                            applyPromocode();
                        }}
                    >
                        Применить
                    </button>
                </div>
            </div>
            <button
                className="btn cart__btn cart__btn_submit"
                type="button"
                onClick={(): void => {
                    newOrderDone();
                }}
            >
                Оформить заказ
            </button>
            {orderDone && (
                <div className="modal modal_confirm active">
                    <div className="modal_order">
                        <img
                            src={orderDoneImg}
                            alt="order-done"
                            className="modal_order__img_done"
                        />
                        <h2>Спасибо, что Вы с нами!</h2>
                        <h2>Ваш заказ уже оформляется!</h2>
                        <img
                            src={orderCartImg}
                            alt="order-cart"
                            className="modal_order__img_cart"
                        />
                        <p>
                            Наш менеджер свяжется с Вами для уточнения деталей.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default PriceBlock;
