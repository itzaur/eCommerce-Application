import { apiRoot } from './Client';
// import { getCustomer } from './getCustomer';
// import { ICustomer } from '../types';

export async function editCustomerAge(
    ID: string,
    birthDayValue: string,
    birthMonthValue: string,
    birthYearValue: string,
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
                            action: 'setDateOfBirth',
                            dateOfBirth: `${birthYearValue}-${birthMonthValue}-${birthDayValue}`,
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
