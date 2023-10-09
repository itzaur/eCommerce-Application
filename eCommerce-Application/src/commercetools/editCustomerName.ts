import { apiRoot } from './Client';

export async function editCustomerName(
    ID: string,
    name: string,
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
                            action: 'setFirstName',
                            firstName: name,
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
}
