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
                const { parameters, itemsPerPage } = params;

                const cards = await getFilterSortSearchProducts(
                    parameters,
                    itemsPerPage
                );
                return {
                    data: {
                        cards,
                    },
                };
            },
        }),

        getProductsLength: build.query<
            Record<'countCardsWithParameters', number> | undefined,
            Omit<
                FilterSortSearchParameters,
                'attributesToSort' & 'currentOffset'
            >
        >({
            queryFn: async (params) => {
                const {
                    categoryType,
                    selectedFiltersList,
                    minSelectedPrice,
                    maxSelectedPrice,
                    discountedProducts,
                    attributesToSearch,
                } = params;

                if (
                    selectedFiltersList.length ||
                    minSelectedPrice ||
                    maxSelectedPrice ||
                    attributesToSearch ||
                    discountedProducts
                ) {
                    const resultForParameters =
                        await getFilterSortSearchProducts(
                            {
                                categoryType,
                                selectedFiltersList,
                                minSelectedPrice,
                                maxSelectedPrice,
                                attributesToSearch,
                                discountedProducts,
                                currentOffset: 0,
                            },
                            500
                        );

                    return {
                        data: {
                            countCardsWithParameters:
                                resultForParameters.length,
                        },
                    };
                }
                return { data: undefined };
            },
        }),

        getProductsParameters: build.query<
            GetProductsParametersApiResults,
            Pick<FilterSortSearchParameters, 'categoryType'>
        >({
            queryFn: async (params) => {
                const { categoryType } = params;

                const result = await getFilterSortSearchProducts(
                    {
                        categoryType,
                        selectedFiltersList: [],
                        minSelectedPrice: 0,
                        maxSelectedPrice: 0,
                        currentOffset: 0,
                    },
                    500
                );
                const filterVariants = checkFilterVariants(result);
                const minPrice = checkMinMaxPrice(result)[0];
                const maxPrice = checkMinMaxPrice(result)[1];
                return {
                    data: {
                        countCards: result.length,
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
    useGetProductsLengthQuery,
    useGetProductsParametersQuery,
} = cardsApi;
