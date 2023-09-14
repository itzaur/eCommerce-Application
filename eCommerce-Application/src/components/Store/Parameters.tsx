import { useEffect, useState, ChangeEvent } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { filterSortSearcProducts } from '../../commercetools/filterSortSearchProducts';
import { setErrorBodyDOM } from '../../utils/constants';

function Parameters(props: {
    setCards: React.Dispatch<React.SetStateAction<ProductProjection[]>>;
    selectedType: string;
    selectedCategory: string;
    selectedCategoryId: string;
    filterVariants: string[];
    minPrice: number;
    maxPrice: number;
    minSelectedPrice: number;
    maxSelectedPrice: number;
    setMinSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
    setMaxSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
    searchValue: string;
    currentPage: number;
    setCountCards: CallableFunction;
    setIsFetching: CallableFunction;
    isFetching: boolean;
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
        currentPage,
        setCountCards,
        setIsFetching,
        isFetching,
    } = props;
    const [selectedFiltersList, setselectedFiltersList] = useState<string[]>(
        []
    );

    let filter: { name: string; key: string } = { name: '', key: '' };
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [discountedProducts, setDiscountedProducts] = useState(false);
    const [sort, setSort] = useState({
        order: '',
        value: 'По умолчанию',
        icon: '↓↑',
    });

    // const [currentPage, setCurrentPage] = useState(2);
    // const [fetching, setFetching] = useState(true);

    // const scrollHandler = (): void => {
    //     if (
    //         document.documentElement.scrollHeight -
    //             (document.documentElement.scrollTop + window.innerHeight) <
    //         100
    //     ) {
    //         setFetching(true);
    //         setCurrentPage((prevPage) => prevPage + 1);
    //         console.log('123');
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('scroll', scrollHandler);

    //     return () => {
    //         document.removeEventListener('scroll', scrollHandler);
    //     };
    // }, []);

    switch (selectedType) {
        case 'Космотуры':
            filter = { name: 'Локация', key: 'location' };
            break;
        case 'Выбрать номер':
            filter = { name: 'Цвет', key: 'color' };
            break;
        case 'Сувениры':
            filter = { name: 'Форма', key: 'shape' };
            break;
        default:
            filter = { name: '', key: '' };
    }

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
        setselectedFiltersList([]);
        setDiscountedProducts(false);
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
        setMinSelectedPrice(minPrice);
        setMaxSelectedPrice(maxPrice);
        setDiscountedProducts(false);
    }, [
        selectedType,
        selectedCategory,
        maxPrice,
        minPrice,
        setMaxSelectedPrice,
        setMinSelectedPrice,
    ]);

    function filterProducts(): void {
        setIsFetching(true);
        filterSortSearcProducts(
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
            currentPage,
            setCountCards,
            setIsFetching,
            isFetching
        )
            .then((data) => {
                if (data) setCards(data);
                setIsFetching(false);
            })
            .catch((err: Error) => {
                setErrorBodyDOM(err);
            });
    }

    // useEffect(() => {
    //     filterSortSearcProducts(
    //         {
    //             selectedCategoryId,
    //             attributesToFilter: filter.key,
    //             selectedFiltersList,
    //             minSelectedPrice,
    //             maxSelectedPrice,
    //             attributesToSort: sort.order,
    //             attributesToSearch: searchValue,
    //             discountedProducts,
    //         },
    //         currentPage,
    //         setCountCards,
    //         setIsFetching,
    //         isFetching
    //     )
    //         .then((data) => {
    //             if (data) setCards(data);
    //         })
    //         .catch((err: Error) => {
    //             setErrorBodyDOM(err);
    //         });
    // }, [
    //     minSelectedPrice,
    //     maxSelectedPrice,
    //     selectedFiltersList,
    //     filtersApplied,
    //     filter.key,
    //     selectedCategoryId,
    //     setCards,
    //     sort,
    //     searchValue,
    //     discountedProducts,
    //     currentPage,
    //     setIsFetching,
    //     setCountCards,
    //     isFetching,
    // ]);

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
                                    filterProducts();
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

                                    filterProducts();
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

                                    filterProducts();
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
                                    filterProducts();
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
                                    filterProducts();
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
                                                filterProducts();
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
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                    filterProducts();
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
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                    filterProducts();
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
                                    if (!filtersApplied)
                                        setFiltersApplied(true);
                                    filterProducts();
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
                                    filterProducts();
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
                            filterProducts();
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
