import { useEffect, ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memoizedCatalogParams } from '../../redux/selectors/selectors';
import {
    setAttributesToSort,
    setSelectedFiltersList,
    setMinSelectedPrice,
    setMaxSelectedPrice,
    setDiscountedProducts,
    setAttributesToSearch,
} from '../../redux/features/catalogSlice';

interface ParametersProps {
    minPrice: number;
    maxPrice: number;
    filterVariants: string[];
}

function Parameters(props: ParametersProps): JSX.Element {
    const { filterVariants, minPrice, maxPrice } = props;

    const {
        categoryType,
        selectedFiltersList,
        minSelectedPrice,
        maxSelectedPrice,
        discountedProducts,
        attributesToSort: sort,
    } = useSelector(memoizedCatalogParams);

    const { attributesToFilter } = categoryType;

    const dispatch = useDispatch();

    function checkFilters(e: ChangeEvent, el: string): void {
        if (e.target instanceof HTMLInputElement) {
            if (e.target.checked) {
                dispatch(
                    setSelectedFiltersList([...selectedFiltersList, `"${el}"`])
                );
            } else {
                const indexEl = selectedFiltersList.indexOf(`"${el}"`);
                const temp = [...selectedFiltersList];
                temp.splice(indexEl, 1);
                dispatch(setSelectedFiltersList(temp));
            }
        }
    }

    const resetFilters = useCallback((): void => {
        dispatch(setMinSelectedPrice(minPrice));
        dispatch(setMaxSelectedPrice(maxPrice));
        dispatch(setSelectedFiltersList([]));
        dispatch(setDiscountedProducts(false));
        dispatch(setAttributesToSearch(''));
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
    }, [minPrice, maxPrice, dispatch]);

    useEffect(() => {
        document.querySelectorAll('input[data-type="filter"').forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const elCopy = el;
                elCopy.checked = false;
            }
        });
    }, [categoryType]);

    return (
        <div className="parameters">
            <div className="parameters__filters">
                {sort && (
                    <div className="parameters__item">
                        <button
                            className="btn parameters__btn parameters__btn_first"
                            type="button"
                        >
                            <span className="parameters__btn-img">
                                {sort.icon}
                            </span>
                            {sort.value}
                        </button>
                        <ul className="parameters__dropdown">
                            <li>
                                <button
                                    type="button"
                                    onClick={(): void => {
                                        dispatch(
                                            setAttributesToSort({
                                                order: '',
                                                value: 'По умолчанию',
                                                icon: '↑',
                                            })
                                        );
                                    }}
                                >
                                    <span>↑</span> По умолчанию
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={(): void => {
                                        dispatch(
                                            setAttributesToSort({
                                                order: 'name.ru-RU asc',
                                                value: 'А - Я',
                                                icon: '↓',
                                            })
                                        );
                                    }}
                                >
                                    <span>&#8595;</span> A - Я
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={(): void => {
                                        dispatch(
                                            setAttributesToSort({
                                                order: 'name.ru-RU desc',
                                                value: 'Я - А',
                                                icon: '↑',
                                            })
                                        );
                                    }}
                                >
                                    <span>&#8593;</span> Я - А
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={(): void => {
                                        dispatch(
                                            setAttributesToSort({
                                                order: 'price asc',
                                                value: 'По возрастанию цены',
                                                icon: '↑',
                                            })
                                        );
                                    }}
                                >
                                    <span>&#8593;</span> По возрастанию цены
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={(): void => {
                                        dispatch(
                                            setAttributesToSort({
                                                order: 'price desc',
                                                value: 'По убыванию цены',
                                                icon: '↓',
                                            })
                                        );
                                    }}
                                >
                                    <span>&#8595;</span> По убыванию цены
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
                {attributesToFilter && (
                    <div className="parameters__item">
                        <button className="btn parameters__btn" type="button">
                            {attributesToFilter.name}
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
                                placeholder={minPrice.toString()}
                                onChange={(e): void => {
                                    if (+e.target.value < maxSelectedPrice)
                                        dispatch(
                                            setMinSelectedPrice(+e.target.value)
                                        );
                                    else {
                                        dispatch(
                                            setMaxSelectedPrice(+e.target.value)
                                        );
                                    }
                                }}
                            />
                            <p>До</p>
                            <input
                                className="price-input_number"
                                type="number"
                                id="price-max"
                                value={maxSelectedPrice || ''}
                                placeholder={maxPrice.toString()}
                                onChange={(e): void => {
                                    if (+e.target.value > minSelectedPrice)
                                        dispatch(
                                            setMaxSelectedPrice(+e.target.value)
                                        );
                                    else {
                                        dispatch(
                                            setMinSelectedPrice(+e.target.value)
                                        );
                                    }
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
                                value={minSelectedPrice || minPrice}
                                onChange={(e): void => {
                                    if (+e.target.value < maxSelectedPrice)
                                        dispatch(
                                            setMinSelectedPrice(+e.target.value)
                                        );
                                    else {
                                        dispatch(
                                            setMaxSelectedPrice(+e.target.value)
                                        );
                                    }
                                }}
                            />
                            <input
                                className="price-input_range"
                                type="range"
                                id="price-range-max"
                                min={minPrice}
                                max={maxPrice}
                                value={maxSelectedPrice || maxPrice}
                                onChange={(e): void => {
                                    if (+e.target.value > minSelectedPrice)
                                        dispatch(
                                            setMaxSelectedPrice(+e.target.value)
                                        );
                                    else {
                                        dispatch(
                                            setMinSelectedPrice(+e.target.value)
                                        );
                                    }
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
                            dispatch(
                                setDiscountedProducts(!discountedProducts)
                            );
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
