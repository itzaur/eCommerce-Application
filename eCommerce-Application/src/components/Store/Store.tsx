import gsap from 'gsap';
import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import ClipLoader from 'react-spinners/RingLoader';
import { CategoryCustom } from '../../types';
import Header from './Header';
import Transition from '../Transition/Transition';
import { Cards, SideBar, Parameters, BreadCrumbs } from './index';
import { getCategories } from '../../commercetools/getCategories';
import { getProductsByProductType } from '../../commercetools/getProductsByType';
import {
    getProductsBySubcategory,
    getSubCategoryId,
} from '../../commercetools/getProductsBySubcategory';
import { getAllProducts } from '../../commercetools/getAllProducts';
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
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState(categoryPath);
    const [selectedCategoryPath, setSelectedCategoryPath] = useState('');
    const [cards, setCards] = useState<ProductProjection[]>([]);
    const [categories, setCategories] = useState<CategoryCustom[]>([]);
    const [filterVariants, setFilterVariants] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minSelectedPrice, setMinSelectedPrice] = useState(0);
    const [maxSelectedPrice, setMaxSelectedPrice] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const itemPerPage = 8;
    const [currentOffset, setCurrentOffset] = useState(0);
    const [countCards, setCountCards] = useState(0);
    const countPages = Math.ceil(countCards / itemPerPage);
    const [isFetching, setIsFetching] = useState(true);

    const [isBreadCrumbsClicked, setIsBreadCrumbsClicked] = useState(false);

    const breadCrumbs = document.querySelector('.bread-crumbs');

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

    useEffect(() => {
        getCategories()
            .then((data) => {
                if (data) setCategories(data);
            })
            .catch((err: Error) => {
                setErrorBodyDOM(err);
            });
        if (category && isBreadCrumbsClicked) {
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );
            getSubCategoryId(category)
                .then((data) => {
                    if (data) setSelectedCategoryId(data);
                    setIsFetching(false);
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        }
        if (selectedCategory && !isBreadCrumbsClicked) {
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );
            getProductsBySubcategory(
                selectedCategory,
                setCountCards,
                currentOffset,
                itemPerPage
            )
                .then((data) => {
                    if (data) {
                        if (data.length) {
                            setFilterVariants(checkFilterVariants(data));
                        }
                        setCards(data);
                        setMinPrice(checkMinMaxPrice(data)[0]);
                        setMaxPrice(checkMinMaxPrice(data)[1]);
                        setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                        setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                    }
                    setIsFetching(false);
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        } else if (selectedType && !isBreadCrumbsClicked) {
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );

            getProductsByProductType(
                selectedType,
                itemPerPage,
                setCountCards,
                currentOffset
            )
                .then((data) => {
                    if (data) {
                        if (data.length) {
                            setFilterVariants(checkFilterVariants(data));
                        }
                        setCards(data);
                        setSelectedCategoryId('');
                        setMinPrice(checkMinMaxPrice(data)[0]);
                        setMaxPrice(checkMinMaxPrice(data)[1]);
                        setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                        setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                    }
                    setIsFetching(false);
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        } else {
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );
            getAllProducts(setCountCards, currentOffset, itemPerPage)
                .then((data) => {
                    if (data) {
                        setCards(data);
                        setSelectedCategoryId('');
                        setMinPrice(checkMinMaxPrice(data)[0]);
                        setMaxPrice(checkMinMaxPrice(data)[1]);
                        setMinSelectedPrice(checkMinMaxPrice(data)[0]);
                        setMaxSelectedPrice(checkMinMaxPrice(data)[1]);
                    }
                    setIsFetching(false);
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        }
    }, [
        selectedCategory,
        selectedType,
        category,
        currentOffset,
        isBreadCrumbsClicked,
        breadCrumbs?.lastElementChild?.classList,
        countCards,
        breadCrumbs?.lastElementChild,
    ]);

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

                        <div className="store__navigation">
                            <button
                                type="button"
                                className="btn_action btn_store"
                                onClick={(): void | null =>
                                    currentOffset < countCards - itemPerPage
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
                                        currentOffset < countCards - itemPerPage
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
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
