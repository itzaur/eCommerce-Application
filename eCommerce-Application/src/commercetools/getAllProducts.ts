import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export async function getAllProducts(): Promise<
    ProductProjection[] | undefined
> {
    try {
        const result = await apiRoot.productProjections().get().execute();
        return result.body.results;
    } catch {
        //
    }
    return undefined;
}
