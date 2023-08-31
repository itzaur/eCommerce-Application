import { Address } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
// import { getCustomer } from './getCustomer';
// import { ICustomer } from '../types';

export async function addCustomerAddress(
    ID: string,
    countryShipping: string,
    shippingRegion: string,
    shippingCity: string,
    shippingIndex: string,
    shippingStreet: string,
    checkboxUseAddressAsDefault: boolean,
    version: number,
    setVersion: CallableFunction,
    setAddAddressFormView: CallableFunction,
    setTypeAddresses: CallableFunction,
    addressTypeView: boolean,
    setDefaultAddresses: CallableFunction
): Promise<void> {
    let countryShippingAbbr = '';
    const countriesAbbr = [
        { long: 'Россия', short: 'RU' },
        { long: 'Беларусь', short: 'BY' },
        { long: 'Польша', short: 'PL' },
    ];
    countriesAbbr.forEach((el) => {
        if (el.long === countryShipping) countryShippingAbbr = el.short;
    });
    try {
        const response = await apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    version,
                    actions: [
                        {
                            action: 'addAddress',
                            address: {
                                country: countryShippingAbbr,
                                region: shippingRegion,
                                city: shippingCity,
                                postalCode: shippingIndex,
                                streetName: shippingStreet,
                            },
                        },
                    ],
                },
            })
            .execute();

        const { addresses } = response.body;
        const lastAddressIndex = addresses[addresses.length - 1].id;

        setVersion(response.body.version);

        const addressResponse = await apiRoot
            .customers()
            .withId({ ID })
            .post({
                body: {
                    version: response.body.version,
                    actions: [
                        {
                            action: addressTypeView
                                ? 'addShippingAddressId'
                                : 'addBillingAddressId',
                            addressId: `${lastAddressIndex}`,
                        },
                    ],
                },
            })
            .execute();

        setVersion(addressResponse.body.version);

        if (checkboxUseAddressAsDefault) {
            const addressDefaultResponse = await apiRoot
                .customers()
                .withId({ ID })
                .post({
                    body: {
                        version: addressResponse.body.version,
                        actions: [
                            {
                                action: addressTypeView
                                    ? 'setDefaultShippingAddress'
                                    : 'setDefaultBillingAddress',
                                addressId: `${lastAddressIndex}`,
                            },
                        ],
                    },
                })
                .execute();
            // console.log('----', addresses[addresses.length - 1]);
            setDefaultAddresses([addresses[addresses.length - 1]]);
            setVersion(addressDefaultResponse.body.version);
        }

        setTypeAddresses((prev: Address[]) => [
            ...prev,
            addresses[addresses.length - 1],
        ]);

        setAddAddressFormView(true);
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
