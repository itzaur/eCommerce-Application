import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getTypeId(
    productTypeName: string
): Promise<string | undefined> {
    try {
        // console.log('getTypeId++++++++');
        const productType = await apiRoot
            .productTypes()
            .get({ queryArgs: { where: `name="${productTypeName}"` } })
            .execute();

        return productType.body.results[0].id;
    } catch {
        throw new Error(serverErrorMessage);
    }
    return undefined;
}

export async function getProductsByProductType(
    typeName: string,
    setCountCards?: CallableFunction,
    currentPage?: number
    // countCards?: number
): Promise<ProductProjection[] | undefined> {
    try {
        // console.log('getProductsByProductType++++++++++');

        const typeId = await getTypeId(typeName);
        const result = await apiRoot
            .productProjections()
            .get({
                queryArgs: {
                    where: `productType(id="${typeId}")`,
                    offset: currentPage,
                    limit: 8,
                },
            })
            .execute();
        // console.log('result__TYPE', result.body);
        // console.log('GGG', currentPage);
        if (setCountCards) {
            setCountCards(result.body.total);
        }

        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
    return undefined;
}
