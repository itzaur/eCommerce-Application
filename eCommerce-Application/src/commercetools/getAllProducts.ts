import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getAllProducts(
    setCountCards: CallableFunction,
    currentPage: number,
    itemPerPage: number
): Promise<ProductProjection[]> {
    // console.log('getAllProducts+++++');
    try {
        const result = await apiRoot
            .productProjections()
            .get({ queryArgs: { offset: currentPage, limit: itemPerPage } })
            .execute();
        // console.log('RESULT', result.body);
        // console.log('fbf111', result.body.total);
        setCountCards(result.body.total);
        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
}
