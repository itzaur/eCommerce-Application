import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export async function getProductKey(key: string): Promise<Product | undefined> {
    try {
        const result = await apiRoot
            .products()
            .withKey({ key })
            .get()
            .execute();
        return result.body;
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message);
    }
    return undefined;
}
