import { apiRoot } from './Client';

export async function editCustomerEmail(
    ID: string,
    email: string,
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
                            action: 'changeEmail',
                            email,
                        },
                    ],
                },
            })
            .execute();

        setVersion(response.body.version);
    } catch (e) {
        const error = e as Error;
        if (
            error.message ===
            'There is already an existing customer with the provided email.'
        ) {
            throw new Error('Такая почта уже существует', {
                cause: 'emailError',
            });
        }
        if (error.message === 'Failed to fetch') {
            throw new Error('Ошибка сервера', {
                cause: 'ServerError',
            });
        }
    }
}
