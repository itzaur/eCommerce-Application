import { Address } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
// import { getCustomer } from './getCustomer';
// import { ICustomer } from '../types';

export async function editCustomerAddress(
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
    addressId: string,
    addressTypeView: boolean,
    defaultAddresses: Address[] | undefined,
    setDefaultAddresses: CallableFunction,
    changeAddressIndex: number
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
                            action: 'changeAddress',
                            addressId,
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
        // const lastAddressIndex = addresses[addresses.length - 1].id;

        // console.log(changeAddressIndex);

        setVersion(response.body.version);

        if (checkboxUseAddressAsDefault) {
            const addressDefaultResponse = await apiRoot
                .customers()
                .withId({ ID })
                .post({
                    body: {
                        version: response.body.version,
                        actions: [
                            {
                                action: addressTypeView
                                    ? 'setDefaultShippingAddress'
                                    : 'setDefaultBillingAddress',
                                addressId,
                            },
                        ],
                    },
                })
                .execute();

            // console.log('TEST', addresses);

            setDefaultAddresses([addresses[changeAddressIndex]]);
            setVersion(addressDefaultResponse.body.version);
        }

        setTypeAddresses((prev: Address[]) => [
            ...prev.slice(0, changeAddressIndex),
            addresses[changeAddressIndex],
            ...addresses.slice(changeAddressIndex + 1, addresses.length),
        ]);

        if (
            defaultAddresses &&
            defaultAddresses[0].id === addresses[changeAddressIndex].id
        ) {
            // console.log(
            //     'defa',
            //     defaultAddresses[0].id === addresses[changeAddressIndex].id
            // );
            setDefaultAddresses([addresses[changeAddressIndex]]);
            // console.log('defa', );
        }
        // console.log('defa2', [addresses[changeAddressIndex]]);

        // setDefaultAddresses([addresses[changeAddressIndex]]);

        setAddAddressFormView(true);
    } catch (err) {
        // console.log(err);
    }
    return undefined;
}
