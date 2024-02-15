import { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export async function getCustomer(ID: string): Promise<Customer | undefined> {
    try {
        const result = await apiRoot.customers().withId({ ID }).get().execute();
        return result.body;
    } catch (e) {
        const error = e as Error;
        if (error.message === 'Failed to fetch') {
            throw new Error('Ошибка сервера', {
                cause: 'ServerError',
            });
        }

        if (error.message === 'URI not found: /odyssey4165/customers/{ID}') {
            throw new Error('Пользователь не существует', {
                cause: 'ServerCustomerError',
            });
        }
    }
    return undefined;
}
