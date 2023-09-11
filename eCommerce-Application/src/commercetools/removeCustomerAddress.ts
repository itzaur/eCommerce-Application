import { apiRoot } from './Client';

export async function removeCustomerAddress(
    ID: string,
    addressId: string,
    version: number,
    setVersion: CallableFunction
): Promise<void> {
    try {
        const response = await apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    version,
                    actions: [
                        {
                            action: 'removeAddress',
                            addressId: `${addressId}`,
                        },
                    ],
                },
            })
            .execute();
        setVersion(response.body.version);
    } catch (e) {
        const error = e as Error;
        if (error.message === 'Failed to fetch') {
            throw new Error('Ошибка сервера', {
                cause: 'ServerError',
            });
        }
    }
    return undefined;
}
