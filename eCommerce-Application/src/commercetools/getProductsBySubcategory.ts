import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export async function getSubCategoryId(
    categoryExternalId: string
): Promise<string | undefined> {
    try {
        const category = await apiRoot
            .categories()
            .get({ queryArgs: { where: `externalId="${categoryExternalId}"` } })
            .execute();
        return category.body.results[0].id;
    } catch {
        //
    }
    return undefined;
}
export async function getProductsBySubcategory(
    categoryExternalId: string
): Promise<ProductProjection[] | undefined> {
    try {
        const categoryId = await getSubCategoryId(categoryExternalId);
        const result = await apiRoot
            .productProjections()
            .get({
                queryArgs: { where: `categories(id="${categoryId}")` },
            })
            .execute();
        return result.body.results;
    } catch {
        //
    }
    return undefined;
}
