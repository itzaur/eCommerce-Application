import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';
import { checkFilterVariants } from '../../utils/checkFilterVariants';

function Parameters(props: {
    cards: ProductProjection[];
    selectedType: string;
    selectedCategory: string;
}): JSX.Element {
    const { cards, selectedType, selectedCategory } = props;
    const [selectedCategoriesList] = useState<string[]>([]);

    const [minPrice, maxPrice] = cards.length
        ? checkMinMaxPrice(cards)
        : [0, 0];

    let filter;
    const filterVariants = cards.length ? checkFilterVariants(cards) : [];
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(0);
    const [sortOrderValue, setSortOrderValue] = useState('По умолчанию');
    const [sortOrderIcon, setSortOrderIcon] = useState('↓↑');
    if (selectedType === 'Космотуры') {
        filter = { name: 'Локация', key: 'location' };
    }

    useEffect(() => {
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
    }, [selectedType, selectedCategory]);

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
                {(selectedType || selectedCategory) && (
                    <div className="parameters__item">
                        <button className="btn parameters__btn" type="button">
                            {filter ? filter.name : ''}
                            <span className="parameters__btn__illustration">
                                {filterVariants.length
                                    ? filterVariants.length
                                    : 0}
                            </span>
                        </button>
                        <ul className="parameters__dropdown">
                            {filterVariants?.map((el, index) => (
                                <li key={index}>
                                    <label htmlFor={el}>
                                        <input
                                            data-type="filter"
                                            type="checkbox"
                                            defaultChecked={false}
                                            id={el}
                                            onChange={(e): void => {
                                                if (e.target.checked) {
                                                    selectedCategoriesList.push(
                                                        el
                                                    );
                                                }
                                                if (!e.target.checked) {
                                                    const indexElem =
                                                        selectedCategoriesList.indexOf(
                                                            el
                                                        );
                                                    selectedCategoriesList.splice(
                                                        indexElem,
                                                        1
                                                    );
                                                }
                                            }}
                                        />
                                        {el}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
                                value={minSelectedPrice || minPrice}
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
                                value={maxSelectedPrice || maxPrice}
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
                                value={minSelectedPrice || minPrice}
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
                                value={maxSelectedPrice || maxPrice}
                                onChange={(e): void =>
                                    setMaxSelectedPrice(+e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <button
                    className="btn parameters__btn parameters__btn_promotions"
                    type="button"
                >
                    Акции
                </button>
            </div>

            <button
                className="btn parameters__btn parameters__btn_reset"
                type="button"
            >
                Очистить фильтры
            </button>
        </div>
    );
}

export default Parameters;
