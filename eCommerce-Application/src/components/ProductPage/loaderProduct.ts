import { Product } from '@commercetools/platform-sdk';
import { getProductKey } from '../../commercetools/getProductKey';

export async function loaderProduct(
    id: string | undefined
): Promise<Product | void> {
    try {
        return id ? await getProductKey(id) : undefined;
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith('URI not found'))
                throw new Error('Not Found');
            else throw new Error(e.message);
        }
    }
    return undefined;
}
