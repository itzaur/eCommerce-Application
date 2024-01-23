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

import { store } from '../../redux/store/store';
import {
    useGetProductsQuery,
    useGetProductsParametersQuery,
    cardsApi,
} from '../../redux/api/searchCards';
import { memoizedCatalogParams } from '../../redux/selectors/selectors';
import { setCategoryType } from '../../redux/features/catalogSlice';

// eslint-disable-next-line
export async function loaderStore(): Promise<LoaderStoreResult | undefined> {
    const sideBarListResponse = store.dispatch(
        cardsApi.endpoints.getCategories.initiate(undefined)
    );

    try {
        const sideBarList = await sideBarListResponse.unwrap();
        if (sideBarList) {
            return checkSelectedTypeCategory(sideBarList);
        }
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message);
    } finally {
        sideBarListResponse.unsubscribe();
    }
    return undefined;
}

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
    } = catalogParams;
    const itemPerPage = 8;
    const [currentOffset, setCurrentOffset] = useState(0);

    const { data, isLoading, isFetching, error } = useGetProductsQuery({
        parameters: catalogParams,
        currentOffset,
        itemsPerPage: itemPerPage,
    });
    const { cards } = data || {};
    const { data: cardsParameters } = useGetProductsParametersQuery({
        categoryType,
        selectedFiltersList,
        minSelectedPrice,
        maxSelectedPrice,
        attributesToSearch,
    });
    const {
        countCards = 0,
        filterVariants = [],
        minPrice = 0,
        maxPrice = 0,
    } = cardsParameters || {};

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
                dispatch(
                    setCategoryType({
                        attributesToFilter: tempSelectedType
                            ? categories.find(
                                  (item) =>
                                      item.name === tempSelectedType.parent.name
                              )?.filter
                            : '',
                        selectedCategoryId: categoryId || '',
                    })
                );
            } catch (e: unknown) {
                if (e instanceof Error) setServerError(e.message);
            }
        },
        [dispatch]
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

    useEffect(() => {
        if (currentOffset) setCurrentOffset(0);
        // eslint-disable-next-line
    }, [catalogParams]);

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

                        {countCards ? (
                            <Pagination
                                countCards={countCards}
                                currentOffset={currentOffset}
                                setCurrentOffset={setCurrentOffset}
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
