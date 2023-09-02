import { apiRoot } from './Client';
// import { getCustomer } from './getCustomer';
// import { ICustomer } from '../types';

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

        // const { addresses } = response.body;
        // const lastAddressIndex = addresses[addresses.length - 1].id;
        setVersion(response.body.version);
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
