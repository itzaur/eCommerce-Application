import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getAllProducts(): Promise<ProductProjection[]> {
    try {
        const result = await apiRoot
            .productProjections()
            .get({ queryArgs: { limit: 100 } })
            .execute();
        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
