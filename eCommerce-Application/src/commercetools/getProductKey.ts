import { Product } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getProductKey(key: string): Promise<Product> {
    try {
        const result = await apiRoot
            .products()
            .withKey({ key })
            .get()
            .execute();
        return result.body;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
