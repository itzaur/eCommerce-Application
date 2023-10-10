import gsap from 'gsap';
import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import ClipLoader from 'react-spinners/RingLoader';
import { CategoryCustom } from '../../types';
import Header from './Header';
import Transition from '../Transition/Transition';
import { Cards, SideBar, Parameters, BreadCrumbs } from './index';
import { getCategories } from '../../commercetools/getCategories';
import { getSubCategoryId } from '../../commercetools/getProductsBySubcategory';
import { getFilterSortSearchProducts } from '../../commercetools/getFilterSortSearchProducts';
import { checkFilterVariants } from '../../utils/checkFilterVariants';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';
import { setErrorBodyDOM } from '../../utils/constants';
import arrowPrev from '../../assets/icons/arrow-prev.svg';
import arrowNext from '../../assets/icons/arrow-next.svg';

function Store({
    type,
    category,
    typePath,
    categoryPath,
}: {
    type: string;
    category: string;
    typePath: string;
    categoryPath: string;
}): JSX.Element {
    const [selectedType, setSelectedType] = useState(type);
    const [selectedTypePath, setSelectedTypePath] = useState(typePath);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategoryPath, setSelectedCategoryPath] =
        useState(categoryPath);
    const [cards, setCards] = useState<ProductProjection[]>([]);
    const [categories, setCategories] = useState<CategoryCustom[]>([]);
    const [filterVariants, setFilterVariants] = useState<string[]>([]);
    let filter: { name: string; key: string } = { name: '', key: '' };
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
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const itemPerPage = 8;
    const [currentOffset, setCurrentOffset] = useState(0);
    const [countCards, setCountCards] = useState(0);
    const [countPages, setCountPages] = useState(
        Math.ceil(countCards / itemPerPage)
    );
    const [isFetching, setIsFetching] = useState(true);

    // eslint-disable-next-line
    const [isBreadCrumbsClicked, setIsBreadCrumbsClicked] = useState(false);

    document.querySelectorAll('.btn').forEach((item) => {
        item.classList.remove('sidebar__category_active');

        if (item.textContent === selectedType && !selectedCategory) {
            item.classList.add('sidebar__category_active');
        }
    });

    document.querySelectorAll('.sidebar__category').forEach((item) => {
        item.classList.remove('sidebar__category_active');
        if (item.textContent === selectedCategory) {
            item.classList.add('sidebar__category_active');
        }
    });

    const timeline = gsap.timeline();

    function getCards(categoryId: string): void {
        getFilterSortSearchProducts(
            {
                selectedCategoryId: categoryId,
                attributesToFilter: filter.key,
                selectedFiltersList: [],
                minSelectedPrice: 0,
                maxSelectedPrice: 100000,
            },
            0,
            100
        ).then((data) => {
            if (data.length) {
                setFilterVariants(checkFilterVariants(data));
                const tempMinPrice = checkMinMaxPrice(data)[0];
                const tempMaxPrice = checkMinMaxPrice(data)[1];
                setMinPrice(tempMinPrice);
                setMaxPrice(tempMaxPrice);
                setMinSelectedPrice(tempMinPrice);
                setMaxSelectedPrice(tempMaxPrice);
                setCountCards(data.length);
                setCountPages(Math.ceil(data.length / itemPerPage));
                setCurrentOffset(0);
                setCards(data);
                getFilterSortSearchProducts(
                    {
                        selectedCategoryId: categoryId,
                        attributesToFilter: filter.key,
                        selectedFiltersList: [],
                        minSelectedPrice: 0,
                        maxSelectedPrice: 100000,
                        attributesToSearch: searchValue,
                    },
                    currentOffset,
                    itemPerPage
                )
                    .then((items) => {
                        if (items) {
                            setCards(items);
                        }

                        setIsFetching(false);
                    })
                    .catch((err: Error) => {
                        setErrorBodyDOM(err);
                    });
            }
        });
    }

    useEffect(() => {
        if (!selectedCategory) setSelectedCategoryId('');
        getCategories()
            .then((data) => {
                if (data) setCategories(data);
            })
            .catch((err: Error) => {
                setErrorBodyDOM(err);
            });
        const breadCrumbs = document.querySelector('.bread-crumbs');
        breadCrumbs?.lastElementChild?.classList.add(
            'sidebar__category_active'
        );

        if (selectedCategory) {
            getSubCategoryId(selectedCategory)
                .then((data) => {
                    if (data) {
                        setSelectedCategoryId(data);
                        getCards(data);
                    }
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        } else {
            getCards(selectedCategoryId);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, selectedType]);

    function checkCurrentPageNotLastPage(): boolean {
        return currentOffset / itemPerPage + 1 !== countPages;
    }

    return (
        <>
            <Transition timeline={timeline} />
            <Header setSearchValue={setSearchValue} withSearchValue />
            <section className="store__main">
                <BreadCrumbs
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedTypePath={selectedTypePath}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedCategoryId={setSelectedCategoryId}
                    selectedCategoryPath={selectedCategoryPath}
                    selectedProduct=""
                    selectedProductPath=""
                    setIsFetching={setIsFetching}
                    setCurrentOffset={setCurrentOffset}
                    setIsBreadCrumbsClicked={setIsBreadCrumbsClicked}
                />
                <section className="store__content">
                    <SideBar
                        categories={categories}
                        setSelectedType={setSelectedType}
                        setSelectedTypePath={setSelectedTypePath}
                        setSelectedCategory={setSelectedCategory}
                        setSelectedCategoryId={setSelectedCategoryId}
                        setSelectedCategoryPath={setSelectedCategoryPath}
                        setIsFetching={setIsFetching}
                        setCurrentOffset={setCurrentOffset}
                        setIsBreadCrumbsClicked={setIsBreadCrumbsClicked}
                    />
                    <div className="store__cards">
                        <Parameters
                            setCards={setCards}
                            selectedType={selectedType}
                            selectedCategory={selectedCategory || ''}
                            selectedCategoryId={selectedCategoryId}
                            filter={filter}
                            filterVariants={filterVariants}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            minSelectedPrice={minSelectedPrice}
                            maxSelectedPrice={maxSelectedPrice}
                            setMinSelectedPrice={setMinSelectedPrice}
                            setMaxSelectedPrice={setMaxSelectedPrice}
                            searchValue={searchValue}
                            currentOffset={currentOffset}
                            setIsFetching={setIsFetching}
                            itemPerPage={itemPerPage}
                            setCurrentOffset={setCurrentOffset}
                            setCountCards={setCountCards}
                            setCountPages={setCountPages}
                        />

                        {!cards.length && !isFetching && (
                            <h2 className="no-cards">
                                Вселенная бесконечна, а наши продукты нет. Мы
                                ничего не нашли :(
                            </h2>
                        )}
                        {isFetching ? (
                            <ClipLoader
                                color="#4fe1e3"
                                loading={isFetching}
                                size={150}
                                className="store__loader"
                            />
                        ) : (
                            cards.length > 0 && <Cards cards={cards} />
                        )}

                        {cards.length ? (
                            <div className="store__navigation">
                                {checkCurrentPageNotLastPage() && (
                                    <button
                                        type="button"
                                        className="btn_action btn_store"
                                        onClick={(): void | null =>
                                            currentOffset <
                                            countCards - itemPerPage
                                                ? (setIsFetching(true),
                                                  setCurrentOffset(
                                                      (prevPage) =>
                                                          prevPage + itemPerPage
                                                  ))
                                                : null
                                        }
                                    >
                                        Следующая страница
                                    </button>
                                )}

                                <div className="store__pages">
                                    <button
                                        type="button"
                                        className="store__page store__page-prev"
                                        onClick={(): void | null =>
                                            currentOffset >= itemPerPage
                                                ? (setIsFetching(true),
                                                  setCurrentOffset(
                                                      (prevPage) =>
                                                          prevPage - itemPerPage
                                                  ))
                                                : null
                                        }
                                    >
                                        <img src={arrowPrev} alt="arrow" />
                                    </button>
                                    <div className="store__current-page">
                                        {currentOffset / itemPerPage + 1}
                                    </div>
                                    <div className="store__count-page">
                                        {countPages}
                                    </div>
                                    <button
                                        type="button"
                                        className="store__page store__page-next"
                                        onClick={(): void | null =>
                                            currentOffset <
                                            countCards - itemPerPage
                                                ? (setIsFetching(true),
                                                  setCurrentOffset(
                                                      (prevPage) =>
                                                          prevPage + itemPerPage
                                                  ))
                                                : null
                                        }
                                    >
                                        <img src={arrowNext} alt="arrow" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
