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

        // const { addresses } = response.body;
        // const lastAddressIndex = addresses[addresses.length - 1].id;
        setVersion(response.body.version);
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
