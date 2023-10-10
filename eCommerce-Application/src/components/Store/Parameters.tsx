import { useEffect, useState, ChangeEvent } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { getFilterSortSearchProducts } from '../../commercetools/getFilterSortSearchProducts';
import { setErrorBodyDOM } from '../../utils/constants';

function Parameters(props: {
    setCards: React.Dispatch<React.SetStateAction<ProductProjection[]>>;
    selectedType: string;
    selectedCategory: string;
    selectedCategoryId: string;
    filter: { name: string; key: string };
    filterVariants: string[];
    minPrice: number;
    maxPrice: number;
    minSelectedPrice: number;
    maxSelectedPrice: number;
    setMinSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
    setMaxSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
    searchValue: string;
    currentOffset: number;
    setIsFetching: CallableFunction;
    itemPerPage: number;
    setCountCards: React.Dispatch<React.SetStateAction<number>>;
    setCountPages: React.Dispatch<React.SetStateAction<number>>;
    setCurrentOffset: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
    const {
        setCards,
        selectedType,
        selectedCategory,
        selectedCategoryId,
        filter,
        filterVariants,
        minPrice,
        maxPrice,
        minSelectedPrice,
        maxSelectedPrice,
        setMinSelectedPrice,
        setMaxSelectedPrice,
        searchValue,
        currentOffset,
        setIsFetching,
        itemPerPage,
        setCountCards,
        setCountPages,
        setCurrentOffset,
    } = props;
    const [selectedFiltersList, setselectedFiltersList] = useState<string[]>(
        []
    );
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [discountedProducts, setDiscountedProducts] = useState(false);
    const [sort, setSort] = useState({
        order: '',
        value: 'По умолчанию',
        icon: '↓↑',
    });

    function checkFilters(e: ChangeEvent, el: string): void {
        if (e.target instanceof HTMLInputElement) {
            if (e.target.checked) {
                setselectedFiltersList([...selectedFiltersList, `"${el}"`]);
                if (!filtersApplied) setFiltersApplied(true);
            } else {
                const indexEl = selectedFiltersList.indexOf(`"${el}"`);
                const temp = [...selectedFiltersList];
                temp.splice(indexEl, 1);
                setselectedFiltersList(temp);
            }
        }
    }

    function resetFilters(): void {
        setMinSelectedPrice(minPrice);
        setMaxSelectedPrice(maxPrice);
        setselectedFiltersList([]);
        setDiscountedProducts(false);
        setDiscountedProducts(false);
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
    }

    useEffect(() => {
        if (!searchValue) setFiltersApplied(false);
        setselectedFiltersList([]);
        setDiscountedProducts(false);
        setSort({ order: '', value: 'По умолчанию', icon: '↓↑' });
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedType, selectedCategory]);

    function getOnlyCards(): void {
        getFilterSortSearchProducts(
            {
                selectedCategoryId,
                attributesToFilter: filter.key,
                selectedFiltersList,
                minSelectedPrice,
                maxSelectedPrice,
                attributesToSort: sort.order,
                attributesToSearch: searchValue,
                discountedProducts,
            },
            currentOffset,
            itemPerPage
        )
            .then((data) => {
                if (data) {
                    setCards(data);
                }
                setIsFetching(false);
            })
            .catch((err: Error) => {
                setErrorBodyDOM(err);
            });
    }

    function filterProducts(): void {
        setIsFetching(true);
        getFilterSortSearchProducts(
            {
                selectedCategoryId,
                attributesToFilter: filter.key,
                selectedFiltersList,
                minSelectedPrice,
                maxSelectedPrice,
                attributesToSort: sort.order,
                attributesToSearch: searchValue,
                discountedProducts,
            },
            0,
            100
        ).then((data) => {
            setCurrentOffset(0);
            setCountCards(data.length);
            setCountPages(Math.ceil(data.length / itemPerPage));
            getOnlyCards();
        });
    }

    useEffect(() => {
        if (currentOffset) getOnlyCards();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentOffset]);

    useEffect(() => {
        if (filtersApplied) {
            filterProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedFiltersList,
        discountedProducts,
        sort,
        minSelectedPrice,
        maxSelectedPrice,
    ]);

    useEffect(() => {
        if (searchValue || (!searchValue && filtersApplied)) {
            setFiltersApplied(true);
            filterProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    function filterByPrice(): void {
        if (!filtersApplied) setFiltersApplied(true);
    }

    return (
        <div className="parameters">
            <div className="parameters__filters">
                <div className="parameters__item">
                    <button
                        className="btn parameters__btn parameters__btn_first"
                        type="button"
                    >
                        <span className="parameters__btn-img">{sort.icon}</span>
                        {sort.value}
                    </button>
                    <ul className="parameters__dropdown">
                        <li>
                            <button
                                type="button"
                                onClick={(): void => {
                                    setSort({
                                        order: '',
                                        value: 'По умолчанию',
                                        icon: '↑',
                                    });
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
                                    setSort({
                                        order: 'name.ru-RU asc',
                                        value: 'А - Я',
                                        icon: '↓',
                                    });
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
                                    setSort({
                                        order: 'name.ru-RU desc',
                                        value: 'Я - А',
                                        icon: '↑',
                                    });
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
                                    setSort({
                                        order: 'price asc',
                                        value: 'По возрастанию цены',
                                        icon: '↑',
                                    });
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
                                    setSort({
                                        order: 'price desc',
                                        value: 'По убыванию цены',
                                        icon: '↓',
                                    });
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
                            <span className="parameters__btn-illustration">
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
                                                checkFilters(e, el);
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
                        <span className="parameters__btn-illustration">$</span>
                    </button>
                    <div className="parameters__dropdown parameters__dropdown_last">
                        <div className="parameters__dropdown-inputs">
                            <p>От</p>
                            <input
                                className="price-input_number"
                                type="number"
                                id="price-min"
                                value={minSelectedPrice || ''}
                                onChange={(e): void => {
                                    setMinSelectedPrice(+e.target.value);
                                    filterByPrice();
                                }}
                            />
                            <p>До</p>
                            <input
                                className="price-input_number"
                                type="number"
                                id="price-max"
                                value={maxSelectedPrice || ''}
                                onChange={(e): void => {
                                    setMaxSelectedPrice(+e.target.value);
                                    filterByPrice();
                                }}
                            />
                        </div>
                        <div className="parameters__dropdown-inputs-range">
                            <input
                                className="price-input_range"
                                type="range"
                                id="price-range-min"
                                min={minPrice}
                                max={maxPrice}
                                value={minSelectedPrice}
                                onChange={(e): void => {
                                    setMinSelectedPrice(+e.target.value);
                                    filterByPrice();
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
                                    filterByPrice();
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="parameters__item">
                    <button
                        className={
                            discountedProducts
                                ? 'btn parameters__btn parameters__btn_promotions parameters__btn_promotions_applied'
                                : 'btn parameters__btn parameters__btn_promotions'
                        }
                        type="button"
                        onClick={(): void => {
                            setDiscountedProducts(!discountedProducts);

                            if (!filtersApplied) setFiltersApplied(true);
                        }}
                    >
                        Акции
                    </button>
                </div>
            </div>

            <button
                className="btn parameters__btn parameters__btn_reset"
                type="button"
                onClick={(): void => {
                    resetFilters();
                }}
            >
                Очистить фильтры
            </button>
        </div>
    );
}

export default Parameters;
