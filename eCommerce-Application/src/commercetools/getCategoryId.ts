import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getCategoryId(
    categoryName: string
): Promise<string | undefined> {
    try {
        const category = await apiRoot
            .categories()
            .get({ queryArgs: { where: `slug(ru-Ru="${categoryName}")` } })
            .execute();
        return category.body.results[0].id;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
