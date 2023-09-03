import { apiRoot } from './Client';
// import { getCustomer } from './getCustomer';
// import { ICustomer } from '../types';

export async function editCustomerSurName(
    ID: string,
    surname: string,
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
                            action: 'setLastName',
                            lastName: surname,
                        },
                    ],
                },
            })
            .execute();

        setVersion(response.body.version);
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
