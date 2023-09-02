import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

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
        throw new Error('Cервер улетел в космос, попробуйте позже');
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
        throw new Error('Cервер улетел в космос, попробуйте позже');
    }
    return undefined;
}
