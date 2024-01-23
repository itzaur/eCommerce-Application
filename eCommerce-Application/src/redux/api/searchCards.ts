import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    GetCardsApiParams,
    CategoryCustom,
    GetProductsParametersApiResults,
    GetCardsApiResults,
    FilterSortSearchParameters,
} from '../../types';
import { getFilterSortSearchProducts } from '../../commercetools/getFilterSortSearchProducts';
import { getCategories } from '../../commercetools/getCategories';
import { checkFilterVariants } from '../../utils/checkFilterVariants';
import { checkMinMaxPrice } from '../../utils/checkMinMaxPrice';

export const cardsApi = createApi({
    reducerPath: 'cardsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    endpoints: (build) => ({
        getProducts: build.query<GetCardsApiResults, GetCardsApiParams>({
            queryFn: async (params) => {
                const { parameters, currentOffset, itemsPerPage } = params;

                const cards = await getFilterSortSearchProducts(
                    parameters,
                    currentOffset,
                    itemsPerPage
                );
                return {
                    data: {
                        cards,
                    },
                };
            },
        }),

        getProductsParameters: build.query<
            GetProductsParametersApiResults,
            Omit<FilterSortSearchParameters, 'attributesToSort'>
        >({
            queryFn: async (params) => {
                const {
                    categoryType,
                    selectedFiltersList,
                    minSelectedPrice,
                    maxSelectedPrice,
                    attributesToSearch,
                } = params;

                const resultForParameters = await getFilterSortSearchProducts(
                    {
                        categoryType,
                        selectedFiltersList: [],
                        minSelectedPrice: 0,
                        maxSelectedPrice: 0,
                    },
                    0,
                    500
                );

                const filterVariants = checkFilterVariants(resultForParameters);
                const minPrice = checkMinMaxPrice(resultForParameters)[0];
                const maxPrice = checkMinMaxPrice(resultForParameters)[1];

                if (
                    selectedFiltersList.length ||
                    minSelectedPrice ||
                    maxSelectedPrice ||
                    attributesToSearch
                ) {
                    const countCards = (
                        await getFilterSortSearchProducts(
                            {
                                categoryType,
                                selectedFiltersList,
                                minSelectedPrice,
                                maxSelectedPrice,
                                attributesToSearch,
                            },
                            0,
                            500
                        )
                    ).length;
                    return {
                        data: {
                            countCards,
                            filterVariants,
                            minPrice,
                            maxPrice,
                        },
                    };
                }

                return {
                    data: {
                        countCards: resultForParameters.length,
                        filterVariants,
                        minPrice,
                        maxPrice,
                    },
                };
            },
        }),
        getCategories: build.query<CategoryCustom[], undefined>({
            queryFn: async () => {
                const categories = await getCategories();

                return {
                    data: categories.sort((a, b) => {
                        if (a.parent.path > b.parent.path) return 1;
                        return -1;
                    }),
                };
            },
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductsParametersQuery,
} = cardsApi;
