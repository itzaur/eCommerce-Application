import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { serverErrorMessage } from '../utils/constants';

export async function getTypeId(
    productTypeName: string
): Promise<string | undefined> {
    try {
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
    typeName: string
): Promise<ProductProjection[] | undefined> {
    try {
        const typeId = await getTypeId(typeName);
        const result = await apiRoot
            .productProjections()
            .get({
                queryArgs: { where: `productType(id="${typeId}")` },
            })
            .execute();

        return result.body.results;
    } catch {
        throw new Error(serverErrorMessage);
    }
    return undefined;
}
