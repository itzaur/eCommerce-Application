import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';
import { Category } from '../../types';

function Parameters(props: {
    cards: ProductProjection[];
    categories: Category[];
    selectedType: string;
    // selectedCategory: string;
    // setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    // setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    // sortOrder: string;
    // setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
    const {
        cards,
        categories,
        selectedType,
        // selectedCategory,
        // setSelectedType,
        // setSelectedCategory,
        // sortOrder,
        // setSortOrder,
    } = props;
    const [minPrice, maxPrice] = checkMinMaxPrice(cards);
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(10000);
    const [sortOrderValue, setSortOrderValue] = useState('По умолчанию');
    const [sortOrderIcon, setSortOrderIcon] = useState(`↓↑`);
    useEffect(() => {
        setMaxSelectedPrice(maxPrice);
        setMinSelectedPrice(minPrice);
    }, [setMinSelectedPrice, setMaxSelectedPrice, maxPrice, minPrice]);

    let categoriesList;
    let categoriesAmount;

    if (selectedType) {
        categoriesList = categories.find((el) => {
            if (el.parent.name === selectedType) {
                return el;
            }
            return undefined;
        })?.items;
        categoriesAmount = categories.map((el) => {
            if (el.parent.name === selectedType && el.items.length)
                return el.items.length;
            return '';
        });
    } else {
        const tempArr: { name: string; path: string }[] = [];
        categories.forEach((el) => {
            el.items.forEach((child) => {
                tempArr.push(child);
            });
        });
        categoriesList = tempArr;
        categoriesAmount = tempArr.length;
    }

    return (
        <div className="parameters">
            <div className="parameters__left-side">
                <div className="parameters__item">
                    <button
                        className="btn parameters__btn parameters__btn_first"
                        type="button"
                    >
                        <span className="parameters__btn__img">
                            {sortOrderIcon}
                        </span>
                        {sortOrderValue}
                    </button>
                    <ul className="parameters__dropdown">
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSortOrderIcon('↑');
                                    setSortOrderValue('По умолчанию');
                                }}
                            >
                                <span>↑</span> По умолчанию
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSortOrderIcon('↓');
                                    setSortOrderValue('А - Я');
                                }}
                            >
                                <span>&#8595;</span> A - Я
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSortOrderIcon('↑');
                                    setSortOrderValue('Я - А');
                                }}
                            >
                                <span>&#8593;</span> Я - А
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSortOrderIcon('↑');
                                    setSortOrderValue('По возрастанию цены');
                                }}
                            >
                                <span>&#8593;</span> По возрастанию цены
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSortOrderIcon('↓');
                                    setSortOrderValue('По убыванию цены');
                                }}
                            >
                                <span>&#8595;</span> По убыванию цены
                            </button>
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
                            <li key={index}>
                                <label htmlFor={el.path}>
                                    <input type="checkbox" id={el.path} />
                                    {el.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="parameters__item">
                    <button className="btn parameters__btn" type="button">
                        Цена{' '}
                        <span className="parameters__btn__illustration">$</span>
                    </button>
                    <div className="parameters__dropdown parameters__dropdown_last">
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
