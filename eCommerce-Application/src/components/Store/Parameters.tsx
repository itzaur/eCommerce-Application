import { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { filterSortSearcProducts } from '../../commercetools/filterSortSearchProducts';

function Parameters(props: {
    selectedType: string;
    selectedCategory: string;
    selectedCategoryId: string;
    setCards: React.Dispatch<React.SetStateAction<ProductProjection[]>>;
    filterVariants: string[];
    minPrice: number;
    maxPrice: number;
    minSelectedPrice: number;
    maxSelectedPrice: number;
    setMinSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
    setMaxSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
    searchValue: string;
}): JSX.Element {
    const {
        setCards,
        selectedType,
        selectedCategory,
        selectedCategoryId,
        filterVariants,
        minPrice,
        maxPrice,
        minSelectedPrice,
        maxSelectedPrice,
        setMinSelectedPrice,
        setMaxSelectedPrice,
        searchValue,
    } = props;
    const [selectedCategoriesList, setSelectedCategoriesList] = useState<
        string[]
    >([]);

    let filter: { name: string; key: string } = { name: '', key: '' };
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [sort, setSort] = useState('');
    const [sortOrderValue, setSortOrderValue] = useState('По умолчанию');
    const [sortOrderIcon, setSortOrderIcon] = useState('↓↑');

    if (selectedType === 'Космотуры') {
        filter = { name: 'Локация', key: 'location' };
    } else if (selectedType === 'Выбрать номер') {
        filter = { name: 'Цвет', key: 'color' };
    } else if (selectedType === 'Сувениры') {
        filter = { name: 'Форма', key: 'shape' };
    }

    useEffect(() => {
        setSelectedCategoriesList([]);
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
        document.querySelectorAll('input[type="number"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.value = '';
            }
        });
        document.querySelectorAll('input[type="range"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.value = '';
            }
        });
    }, [selectedType, selectedCategory]);

    useEffect(() => {
        if (filtersApplied || searchValue) {
            filterSortSearcProducts({
                selectedCategoryId,
                filter: filter.key,
                selectedCategoriesList,
                minSelectedPrice,
                maxSelectedPrice,
                sort,
                searchValue,
            }).then((data) => {
                if (data) setCards(data);
            });
        }
    }, [
        minSelectedPrice,
        maxSelectedPrice,
        selectedCategoriesList,
        filtersApplied,
        filter.key,
        selectedCategoryId,
        setCards,
        sort,
        searchValue,
    ]);

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
                                    setSort('');
                                    setSortOrderIcon('↑');
                                    setSortOrderValue('По умолчанию');
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
                            >
                                <span>↑</span> По умолчанию
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSort('name.ru-RU asc');
                                    setSortOrderIcon('↓');
                                    setSortOrderValue('А - Я');
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
                            >
                                <span>&#8595;</span> A - Я
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSort('name.ru-RU desc');
                                    setSortOrderIcon('↑');
                                    setSortOrderValue('Я - А');
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
                            >
                                <span>&#8593;</span> Я - А
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSort('price asc');
                                    setSortOrderIcon('↑');
                                    setSortOrderValue('По возрастанию цены');
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
                            >
                                <span>&#8593;</span> По возрастанию цены
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSort('price desc');
                                    setSortOrderIcon('↓');
                                    setSortOrderValue('По убыванию цены');
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
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
                                                    setSelectedCategoriesList([
                                                        ...selectedCategoriesList,
                                                        `"${el}"`,
                                                    ]);
                                                    if (!filtersApplied)
                                                        setFiltersApplied(true);
                                                } else if (!e.target.checked) {
                                                    const indexEl =
                                                        selectedCategoriesList.indexOf(
                                                            `"${el}"`
                                                        );
                                                    const temp = [
                                                        ...selectedCategoriesList,
                                                    ];
                                                    temp.splice(indexEl, 1);
                                                    setSelectedCategoriesList(
                                                        temp
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
                                placeholder={minSelectedPrice.toString()}
                                onChange={(e): void => {
                                    setMinSelectedPrice(+e.target.value);
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
                            />
                            <p>До</p>
                            <input
                                className="price-input_number"
                                type="number"
                                id="price-max"
                                placeholder={maxSelectedPrice.toString()}
                                onChange={(e): void => {
                                    setMaxSelectedPrice(+e.target.value);
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
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
                                onChange={(e): void => {
                                    setMinSelectedPrice(+e.target.value);
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
                            />
                            <input
                                className="price-input_range"
                                type="range"
                                id="price-range-max"
                                min={minPrice}
                                max={maxPrice}
                                value={maxSelectedPrice}
                                onChange={(e): void => {
                                    setMaxSelectedPrice(+e.target.value);
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                }}
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
                onClick={(): void => {
                    setMinSelectedPrice(minPrice);
                    setMaxSelectedPrice(maxPrice);
                    setSelectedCategoriesList([]);
                    document
                        .querySelectorAll('input[data-type="filter"')
                        .forEach((el) => {
                            if (el instanceof HTMLInputElement) {
                                const elCopy = el;
                                elCopy.checked = false;
                            }
                        });
                }}
            >
                Очистить фильтры
            </button>
        </div>
    );
}

export default Parameters;
