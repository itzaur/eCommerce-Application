import { Address } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export async function addCustomerAddress(
    ID: string,
    country: string,
    regionValue: string,
    cityValue: string,
    indexValue: string,
    streetValue: string,
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
        if (el.long === country) countryShippingAbbr = el.short;
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
                                region: regionValue,
                                city: cityValue,
                                postalCode: indexValue,
                                streetName: streetValue,
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
