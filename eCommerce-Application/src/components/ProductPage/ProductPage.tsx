import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from '../../commercetools/Client';
import { Header } from '../Store';
import { Footer } from '../MainPage';
import { tours } from '../../utils/constants';
import { ProductOptions } from '../../types';
import avatar from '../../assets/images/user.png';
import star from '../../assets/images/review-star.png';
import starEmpty from '../../assets/images/review-star-empty.png';

function ProductDetail(): JSX.Element {
    const [card, setCard] = useState<Product>();
    const location = useLocation().pathname.split('/').at(-1) as string;

    useEffect(() => {
        async function getProductKey(key: string): Promise<void> {
            try {
                const result = await apiRoot
                    .products()
                    .withKey({ key })
                    .get()
                    .execute();

                setCard(result.body);
            } catch (error) {
                console.log(error);
            }
        }
        getProductKey(location);
    }, [location]);

    // console.log(card);

    const product: ProductOptions = {
        title: card?.masterData.current.name
            ? card.masterData.current.name['ru-RU']
            : '',
        description: card?.masterData.current.description
            ? card.masterData.current.description['ru-RU']
            : '',
        currency: card?.masterData.current.masterVariant.prices
            ? card?.masterData.current.masterVariant.prices[0].value
                  .currencyCode
            : '',
        imageSrc: card?.masterData.current.masterVariant.images
            ? card?.masterData.current.masterVariant.images[0].url
            : '',
        imageAlt: card?.masterData.current.masterVariant.images
            ? card?.masterData.current.masterVariant.images[0].label
            : '',
        detailsTitle: tours.find((el) => el.name === card?.key)?.details?.title,
        detailsItems: tours.find((el) => el.name === card?.key)?.details?.name,
        reviews: tours.find((el) => el.name === card?.key)?.reviews,
    };

    product.price = card?.masterData.current.masterVariant.prices
        ? (
              (card?.masterData.current.masterVariant.prices[0].value
                  .centAmount || 0) / 100
          ).toLocaleString(product.currency, {
              style: 'currency',
              currency: product.currency,
          })
        : '';
    product.discount = card?.masterData.current.masterVariant.prices
        ? (
              (card?.masterData.current.masterVariant.prices[0].discounted
                  ?.value.centAmount || 0) / 100
          ).toLocaleString(product.currency, {
              style: 'currency',
              currency: product.currency,
          })
        : '';

    // console.log(product.price);
    // console.log(product.discount);

    return (
        <>
            <Header />
            <section className="product">
                <div className="product__path">
                    <span>Главная / </span>
                    <span>Каталог / </span>
                    <span>Космотуры / </span>
                    <span>{product.title}</span>
                </div>
                <div className="product__back">
                    <span />
                    <Link to="/store">Назад</Link>
                </div>
                <div className="product__box">
                    <div className="product__imgs">
                        <div className="slider">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                            />
                        </div>
                        <div className="slider-details">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                            />
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                            />
                        </div>
                    </div>
                    <div className="product__info">
                        <h1 className="info-title">{product.title}</h1>
                        <div className="info-text">
                            <p>{product.description}</p>
                        </div>
                        <div className="info-price">
                            <div
                                className={
                                    product.discount !== '$0.00'
                                        ? 'info-discount'
                                        : 'info-discount--inactive'
                                }
                            >
                                <span>Цена со скидкой</span>
                                <span>-10%</span>
                            </div>
                            <div className="info-value">
                                <span className="info-value__discount">
                                    {product.discount !== '$0.00'
                                        ? product.discount
                                        : ''}
                                </span>
                                <span
                                    className={
                                        product.discount !== '$0.00'
                                            ? 'info-value__price'
                                            : 'info-value__price info-value__price-active'
                                    }
                                >
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="product__details">
                        <h3 className="product__details-title">
                            {product.detailsTitle}
                        </h3>
                        <div className="product__details-items">
                            {product.detailsItems?.map((item) => (
                                <button
                                    className="btn btn--item"
                                    key={item}
                                    type="button"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="product__details-btns">
                            <button className="btn btn--product" type="button">
                                Продолжить покупки
                            </button>
                            <button className="btn btn--product" type="button">
                                В корзину
                            </button>
                        </div>
                    </div>
                    <div className="product__reviews">
                        <h2>Отзывы</h2>
                        {product.reviews?.map((el, i) => (
                            <div className="review" key={i}>
                                <div className="review__autor">
                                    <img src={avatar} alt="avatar" />
                                    <span>{el.autor}</span>
                                </div>
                                <div className="review__info">
                                    <div className="review__text">
                                        {el.text}
                                    </div>
                                    <div className="review__stars">
                                        {Array(el.stars)
                                            .fill(el.stars)
                                            .map((_, j) => (
                                                <img
                                                    key={j}
                                                    src={star}
                                                    alt="star"
                                                />
                                            ))}
                                        {Array(el.starsEmpty)
                                            .fill(el.starsEmpty)
                                            .map((_, k) => (
                                                <img
                                                    key={k}
                                                    src={starEmpty}
                                                    alt="starEmpty"
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
export default ProductDetail;
