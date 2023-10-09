import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getSubCategoryId(
    categoryName: string
): Promise<string | undefined> {
    try {
        const category = await apiRoot
            .categories()
            .get({ queryArgs: { where: `name(ru-Ru="${categoryName}")` } })
            .execute();
        return category.body.results[0].id;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
export async function getProductsBySubcategory(
    categoryExternalId: string,
    setCountCards?: CallableFunction,
    currentOffset?: number,
    itemPerPage?: number
): Promise<ProductProjection[] | undefined> {
    try {
        const categoryId = await getSubCategoryId(categoryExternalId);
        const result = await apiRoot
            .productProjections()
            .get({
                queryArgs: {
                    where: `categories(id="${categoryId}")`,
                    offset: currentOffset,
                    limit: itemPerPage,
                },
            })
            .execute();
        setCountCards?.(result.body.total);
        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
