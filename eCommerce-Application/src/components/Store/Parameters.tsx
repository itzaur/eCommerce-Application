import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { categories } from '../../utils/constants';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';

function Parameters(props: {
    cards: ProductProjection[];
    selectedType: string;
    // selectedCategory: string;
    // setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    // setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
    const {
        cards,
        selectedType,
        // selectedCategory,
        // setSelectedType,
        // setSelectedCategory,
    } = props;
    const [minPrice, maxPrice] = checkMinMaxPrice(cards);
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(10000);
    useEffect(() => {
        setMaxSelectedPrice(maxPrice);
        setMinSelectedPrice(minPrice);
    }, [setMinSelectedPrice, setMaxSelectedPrice, maxPrice, minPrice]);

    const categoriesAmount = categories.map((el) => {
        if (el.name === selectedType && el.items.length) return el.items.length;
        return '';
    });
    const categoriesList = categories.find((el) => {
        if (el.name === selectedType && el.items.length) return el;
        return [];
    })?.items;

    return (
        <div className="parameters">
            <div className="parameters__left-side">
                <div className="parameters__item">
                    <button className="btn parameters__btn" type="button">
                        <span className="parameters__btn__img">
                            {' '}
                            &#8595;&#8593;
                        </span>
                        По умолчанию
                    </button>
                    <ul className="parameters__dropdown">
                        <li>
                            <span>&#8593;</span> По умолчанию
                        </li>
                        <li>
                            <span>&#8595;</span> A - Я
                        </li>
                        <li>
                            <span>&#8593;</span> Я - А
                        </li>
                        <li>
                            <span>&#8593;</span> По возрастанию цены
                        </li>
                        <li>
                            <span>&#8595;</span> По убыванию цены
                        </li>
                    </ul>
                </div>
                <div className="parameters__item">
                    <button className="btn parameters__btn" type="button">
                        Категория{' '}
                        <span className="parameters__btn__illustration">
                            {categoriesAmount}
                        </span>
                    </button>
                    <ul className="parameters__dropdown">
                        {categoriesList?.map((el, index) => (
                            <li key={index}>{el}</li>
                        ))}
                    </ul>
                </div>
                <div className="parameters__item">
                    <button className="btn parameters__btn" type="button">
                        Цена{' '}
                        <span className="parameters__btn__illustration">$</span>
                    </button>
                    <div className="parameters__dropdown">
                        <div className="parameters__dropdown__price-inputs_number">
                            <p>От</p>
                            <input
                                className="price-input_number"
                                type="number"
                                id="price-min"
                                value={minSelectedPrice}
                                onChange={(e): void =>
                                    setMinSelectedPrice(
                                        +(+e.target.value).toLocaleString('ru')
                                    )
                                }
                            />
                            <p>До</p>
                            <input
                                className="price-input_number"
                                type="number"
                                id="price-max"
                                value={maxSelectedPrice}
                                onChange={(e): void =>
                                    setMaxSelectedPrice(
                                        +(+e.target.value).toLocaleString('ru')
                                    )
                                }
                            />
                        </div>
                        <div className="parameters__dropdown__price-inputs_range">
                            <input
                                className="price-input_range"
                                type="range"
                                id="price-range-min"
                                min={minPrice}
                                max={maxPrice}
                                value={minSelectedPrice}
                                onChange={(e): void =>
                                    setMinSelectedPrice(+e.target.value)
                                }
                            />
                            <input
                                className="price-input_range"
                                type="range"
                                id="price-range-max"
                                min={minPrice}
                                max={maxPrice}
                                value={maxSelectedPrice}
                                onChange={(e): void =>
                                    setMaxSelectedPrice(+e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <button className="btn parameters__btn" type="button">
                    Акции
                </button>
            </div>

            <button className="btn parameters__btn" type="button">
                Очистить фильтры
            </button>
        </div>
    );
}

export default Parameters;
