import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { FilterSortSearcParameters } from '../types/index';

export async function filterSortSearcProducts(
    parameters: FilterSortSearcParameters
): Promise<ProductProjection[] | undefined> {
    const {
        selectedCategoryId,
        filter,
        selectedCategoriesList,
        minSelectedPrice,
        maxSelectedPrice,
    } = parameters;
    // console.log(parameters);
    const queryArgs = {
        filter: [] as string | string[] | undefined,
        limit: 100,
    };
    if (Array.isArray(queryArgs.filter)) {
        if (selectedCategoryId) {
            queryArgs.filter.push(`categories.id:"${selectedCategoryId}"`);
        }
        if (filter && selectedCategoriesList.length) {
            queryArgs.filter.push(
                `variants.attributes.${filter}:${[...selectedCategoriesList]}`
            );
        }
        if (filter && !selectedCategoriesList.length) {
            queryArgs.filter.push(`variants.attributes.${filter}:exists`);
        }
        if (minSelectedPrice && !maxSelectedPrice) {
            queryArgs.filter.push(
                `variants.price.centAmount:range (${
                    minSelectedPrice * 100
                } to * )`
            );
        }
        if (!minSelectedPrice && maxSelectedPrice) {
            queryArgs.filter.push(
                `variants.price.centAmount:range (* to ${
                    maxSelectedPrice * 100
                })`
            );
        }
        if (minSelectedPrice && maxSelectedPrice) {
            queryArgs.filter.push(
                `variants.price.centAmount:range (${
                    minSelectedPrice * 100
                } to ${maxSelectedPrice * 100})`
            );
        }
    }

    // console.log(queryArgs);

    try {
        const result = await apiRoot
            .productProjections()
            .search()
            .get({
                queryArgs,
            })
            .execute();
        return result.body.results;
    } catch {
        //
    }
    return undefined;
}
