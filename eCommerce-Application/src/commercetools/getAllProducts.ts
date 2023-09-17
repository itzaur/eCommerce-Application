import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getAllProducts(
    setCountCards: CallableFunction,
    currentOffset: number,
    itemPerPage: number
): Promise<ProductProjection[]> {
    try {
        const result = await apiRoot
            .productProjections()
            .get({ queryArgs: { offset: currentOffset, limit: itemPerPage } })
            .execute();
        setCountCards(result.body.total);
        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
