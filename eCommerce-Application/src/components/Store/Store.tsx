import gsap from 'gsap';
import { useState, useEffect, useCallback } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ClipLoader from 'react-spinners/RingLoader';
import Header from './Header';
import Transition from '../Transition/Transition';
import { Cards, SideBar, Parameters, BreadCrumbs, Pagination } from './index';

import { getCategoryId } from '../../commercetools/getCategoryId';

import { checkSelectedTypeCategory } from '../../utils/checkSelectedTypeCategory';
import { categories } from '../../utils/constants';
import { CategoryCustom, LoaderStoreResult } from '../../types';

import {
    useGetProductsQuery,
    useGetProductsParametersQuery,
    useGetProductsLengthQuery,
} from '../../redux/api/searchCards';
import { memoizedCatalogParams } from '../../redux/selectors/selectors';
import { setCategoryType } from '../../redux/features/catalogSlice';

function Store(): JSX.Element {
    const root = document.querySelector('main');
    if (root) root.id = 'store';

    const {
        sideBarList,
        selectedTypeUpdated: selectedTypeInitial,
        selectedCategoryUpdated: selectedCategoryInitial,
    } = useLoaderData() as LoaderStoreResult;

    const location = useLocation();

    const catalogParams = useSelector(memoizedCatalogParams);

    const {
        categoryType,
        selectedFiltersList,
        minSelectedPrice,
        maxSelectedPrice,
        attributesToSearch,
        discountedProducts,
        currentOffset,
    } = catalogParams;
    const itemPerPage = 8;

    const { data, isLoading, isFetching, error } = useGetProductsQuery({
        parameters: catalogParams,
        currentOffset,
        itemsPerPage: itemPerPage,
    });
    const { cards } = data || {};
    const { data: cardsWithParameters } = useGetProductsLengthQuery({
        categoryType,
        selectedFiltersList,
        minSelectedPrice,
        maxSelectedPrice,
        discountedProducts,
        attributesToSearch,
        currentOffset: 0,
    });
    const { countCardsWithParameters = 0 } = cardsWithParameters || {};

    const { data: cardsOnlyCategory } = useGetProductsParametersQuery({
        categoryType,
    });
    const {
        countCards = 0,
        filterVariants = [],
        minPrice = 0,
        maxPrice = 0,
    } = cardsOnlyCategory || {};

    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = useState<CategoryCustom | ''>(
        selectedTypeInitial
    );
    const [selectedCategory, setSelectedCategory] = useState<
        CategoryCustom['items'][0] | ''
    >(selectedCategoryInitial);
    const [serverError, setServerError] = useState('');

    const changeCatalogParams = useCallback(
        async (
            tempSelectedType: CategoryCustom | '',
            tempSelectedCategory: CategoryCustom['items'][0] | ''
        ) => {
            try {
                const categoryId = tempSelectedCategory
                    ? await getCategoryId(tempSelectedCategory.path)
                    : '';
                const newAttributesToFilter = tempSelectedType
                    ? categories.find(
                          (item) => item.name === tempSelectedType.parent.name
                      )?.filter
                    : '';
                if (
                    categoryId !== categoryType.selectedCategoryId ||
                    JSON.stringify(newAttributesToFilter) !==
                        JSON.stringify(categoryType.attributesToFilter)
                ) {
                    dispatch(
                        setCategoryType({
                            attributesToFilter: newAttributesToFilter,
                            selectedCategoryId: categoryId,
                        })
                    );
                }
            } catch (e: unknown) {
                if (e instanceof Error) setServerError(e.message);
            }
        },
        [dispatch, categoryType]
    );

    useEffect(() => {
        if (sideBarList) {
            const { selectedTypeUpdated, selectedCategoryUpdated } =
                checkSelectedTypeCategory(sideBarList);
            setSelectedType(selectedTypeUpdated);
            setSelectedCategory(selectedCategoryUpdated);
            changeCatalogParams(selectedTypeUpdated, selectedCategoryUpdated);
        }
        // eslint-disable-next-line
    }, [location.pathname]);

    const timeline = gsap.timeline();

    if (serverError || error) throw new Error(serverError);

    return (
        <>
            <Transition timeline={timeline} />
            <Header withSearchValue />
            <section className="store__main">
                <BreadCrumbs
                    selectedType={selectedType}
                    selectedCategory={selectedCategory}
                />
                <section className="store__content">
                    {sideBarList && (
                        <SideBar
                            sideBarList={sideBarList}
                            selectedType={selectedType}
                            selectedCategory={selectedCategory}
                        />
                    )}

                    <div className="store__cards">
                        <Parameters
                            filterVariants={filterVariants}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />

                        {isFetching || isLoading ? (
                            <ClipLoader
                                color="#4fe1e3"
                                loading={isFetching}
                                size={150}
                                className="store__loader"
                            />
                        ) : (
                            cards &&
                            (cards.length ? (
                                <Cards cards={cards} />
                            ) : (
                                <h2 className="no-cards">
                                    Вселенная бесконечна, а наши продукты нет.
                                    Мы ничего не нашли :(
                                </h2>
                            ))
                        )}

                        {cards?.length ? (
                            <Pagination
                                countCards={
                                    countCardsWithParameters || countCards
                                }
                                currentOffset={currentOffset}
                                itemPerPage={itemPerPage}
                            />
                        ) : (
                            <> </>
                        )}
                    </div>
                </section>
            </section>
        </>
    );
}

export default Store;
