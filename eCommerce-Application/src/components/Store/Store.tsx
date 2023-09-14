import { useState, useEffect } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import ClipLoader from 'react-spinners/RingLoader';
import { CategoryCustom } from '../../types';
import Header from './Header';
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
import arrow from '../../assets/icons/arrow.svg';

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
    const [currentPage, setCurrentPage] = useState(0);
    const [countCards, setCountCards] = useState(0);
    const countPages = Math.ceil(countCards / itemPerPage);
    const [isFetching, setIsFetching] = useState(true);

    const [isBreadCrumbsClicked, setIsBreadCrumbsClicked] = useState(false);

    const breadCrumbs = document.querySelector('.bread-crumbs');

    // console.log(isBreadCrumbsClicked);

    // console.log('до', cards);

    useEffect(() => {
        getCategories()
            .then((data) => {
                // console.log('1');

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
                    // console.log('2');

                    if (data) setSelectedCategoryId(data);
                    setIsFetching(false);

                    breadCrumbs?.lastElementChild?.classList.add(
                        'sidebar__category_active'
                    );
                })
                .catch((err: Error) => {
                    setErrorBodyDOM(err);
                });
        }
        if (selectedCategory && !isBreadCrumbsClicked) {
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );
            // console.log('3');
            // setCurrentPage(0);
            getProductsBySubcategory(
                selectedCategory,
                setCountCards,
                currentPage
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
            // console.log('4');
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );
            getProductsByProductType(selectedType, setCountCards, currentPage)
                .then((data) => {
                    if (data) {
                        if (data.length) {
                            setFilterVariants(checkFilterVariants(data));
                        }
                        setCards(data);
                        // setSelectedCategoryId('');

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
            // console.log('5');
            breadCrumbs?.lastElementChild?.classList.add(
                'sidebar__category_active'
            );
            getAllProducts(setCountCards, currentPage)
                .then((data) => {
                    if (data) {
                        // setCountCards(data.length);
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
        currentPage,
        isBreadCrumbsClicked,
        breadCrumbs?.lastElementChild?.classList,
    ]);

    return (
        <>
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
                    setCurrentPage={setCurrentPage}
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
                        setCurrentPage={setCurrentPage}
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
                            currentPage={currentPage}
                            setCountCards={setCountCards}
                            setIsFetching={setIsFetching}
                            isFetching={isFetching}
                        />

                        {!cards.length && !isFetching && (
                            <h2 className="no-cards">
                                Вселенная бесконечна, а наши продукты нет. Мы
                                ничего не нашли :(
                            </h2>
                        )}
                        {isFetching ? (
                            <ClipLoader
                                color="#910000"
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
                                className="btn_action"
                                onClick={(): void | null =>
                                    currentPage < countCards - itemPerPage
                                        ? setCurrentPage(
                                              (prevPage) =>
                                                  prevPage + itemPerPage
                                          )
                                        : null
                                }
                            >
                                Следующая страница
                            </button>
                            <div className="store__pages">
                                <button
                                    type="button"
                                    className="store__prev-page"
                                    onClick={(): void | null =>
                                        currentPage >= itemPerPage
                                            ? (setIsFetching(true),
                                              setCurrentPage(
                                                  (prevPage) =>
                                                      prevPage - itemPerPage
                                              ))
                                            : null
                                    }
                                >
                                    <img src={arrow} alt="arrow" />
                                </button>
                                <div className="store__current-page">
                                    {currentPage / itemPerPage + 1}
                                </div>
                                <div className="store__count-page">
                                    {countPages}
                                </div>
                                <button
                                    type="button"
                                    className="store__next-page"
                                    onClick={(): void =>
                                        currentPage < countCards - itemPerPage
                                            ? (setIsFetching(true),
                                              setCurrentPage(
                                                  (prevPage) =>
                                                      prevPage + itemPerPage
                                              ))
                                            : undefined
                                    }
                                >
                                    <img src={arrow} alt="arrow" />
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
