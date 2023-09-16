import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getSubCategoryId(
    categoryName: string
): Promise<string | undefined> {
    try {
        // console.log('getSubCategoryId++++++');
        const category = await apiRoot
            .categories()
            .get({ queryArgs: { where: `name(ru-Ru="${categoryName}")` } })
            .execute();
        return category.body.results[0].id;
    } catch {
        throw new Error(serverErrorMessage);
    }
    return undefined;
}
export async function getProductsBySubcategory(
    categoryExternalId: string,
    setCountCards?: CallableFunction,
    currentPage?: number,
    itemPerPage?: number
): Promise<ProductProjection[] | undefined> {
    try {
        // console.log('getProductsBySubcategory+++++++');
        const categoryId = await getSubCategoryId(categoryExternalId);
        const result = await apiRoot
            .productProjections()
            .get({
                queryArgs: {
                    where: `categories(id="${categoryId}")`,
                    offset: currentPage,
                    limit: itemPerPage,
                },
            })
            .execute();
        if (setCountCards) {
            setCountCards(result.body.total);
        }
        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
    return undefined;
}
