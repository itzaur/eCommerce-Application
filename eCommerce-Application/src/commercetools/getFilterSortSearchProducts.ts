import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { FilterSortSearchParameters } from '../types/index';
import { serverErrorMessage } from '../utils/constants';

export async function getFilterSortSearchProducts(
    parameters: FilterSortSearchParameters,
    currentOffset: number,
    itemPerPage: number
): Promise<ProductProjection[]> {
    const {
        categoryType: { attributesToFilter, selectedCategoryId },
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
        offset: currentOffset,
        limit: itemPerPage,
    };

    if (Array.isArray(queryArgs.filter)) {
        if (selectedCategoryId) {
            queryArgs.filter.push(`categories.id:"${selectedCategoryId}"`);
        }
        if (attributesToFilter.key && selectedFiltersList.length) {
            queryArgs.filter.push(
                `variants.attributes.${attributesToFilter.key}:${selectedFiltersList}`
            );
        }
        if (attributesToFilter.key && !selectedFiltersList.length) {
            queryArgs.filter.push(
                `variants.attributes.${attributesToFilter.key}:exists`
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
        queryArgs.sort = [attributesToSort.order];
    }
    if (queryArgs && attributesToSearch) {
        queryArgs['text.ru-RU'] = attributesToSearch;
        queryArgs.fuzzy = true;
    }

    try {
        const result = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs,
            })
            .execute();
        return result.body.results;
    } catch (e) {
        throw new Error(serverErrorMessage);
    }
}
