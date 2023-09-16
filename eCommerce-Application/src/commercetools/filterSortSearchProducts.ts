import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { FilterSortSearcParameters } from '../types/index';
import { serverErrorMessage } from '../utils/constants';

export async function filterSortSearcProducts(
    parameters: FilterSortSearcParameters,
    currentPage: number,
    // setCountCards: CallableFunction,
    // setIsFetching: CallableFunction,
    // isFetching: boolean
    itemPerPage: number
): Promise<ProductProjection[]> {
    const {
        selectedCategoryId,
        attributesToFilter,
        selectedFiltersList,
        minSelectedPrice,
        maxSelectedPrice,
        attributesToSort,
        attributesToSearch,
        discountedProducts,
    } = parameters;
    const queryArgs: {
        filter: string | string[] | undefined;
        offset: number;
        limit: number;
        sort?: string[];
        ['text.ru-RU']?: string;
        fuzzy?: boolean;
    } = {
        filter: [],
        offset: currentPage,
        limit: itemPerPage,
    };
    if (Array.isArray(queryArgs.filter)) {
        if (selectedCategoryId) {
            queryArgs.filter.push(`categories.id:"${selectedCategoryId}"`);
        }
        if (attributesToFilter && selectedFiltersList.length) {
            queryArgs.filter.push(
                `variants.attributes.${attributesToFilter}:${selectedFiltersList}`
            );
        }
        if (attributesToFilter && !selectedFiltersList.length) {
            queryArgs.filter.push(
                `variants.attributes.${attributesToFilter}:exists`
            );
        }
        if (minSelectedPrice || maxSelectedPrice) {
            queryArgs.filter.push(
                `variants.price.centAmount:range (${
                    minSelectedPrice ? minSelectedPrice * 100 : '*'
                } to ${maxSelectedPrice ? maxSelectedPrice * 100 : '*'})`
            );
        }
        if (discountedProducts) {
            queryArgs.filter.push(`variants.prices.discounted:exists`);
        }
    }

    if (queryArgs && attributesToSort) {
        queryArgs.sort = [attributesToSort];
    }
    if (queryArgs && attributesToSearch) {
        queryArgs['text.ru-RU'] = attributesToSearch;
        queryArgs.fuzzy = true;
    }

    // console.log('OOOO++++');

    try {
        const result = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs,
            })
            .execute();
        // console.log('filetr');
        // if (setCountCards) {
        //     setCountCards(result.body.total);
        // }
        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
