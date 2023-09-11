import { Address } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';

export async function editCustomerAddress(
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
    addressId: string,
    addressTypeView: boolean,
    setDefaultAddresses: CallableFunction,
    changeAddressIndex: number,
    getTypeAddress: CallableFunction,
    typeAddresses?: Address[],
    defaultAddresses?: Address[]
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
                            action: 'changeAddress',
                            addressId,
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

            if (typeAddresses) {
                setDefaultAddresses([typeAddresses[changeAddressIndex]]);
            }
            setVersion(addressDefaultResponse.body.version);
        }

        if (typeAddresses) {
            setTypeAddresses((prev: Address[]) => [
                ...prev.slice(0, changeAddressIndex),
                getTypeAddress(response.body)[changeAddressIndex],
                ...prev.slice(changeAddressIndex + 1, typeAddresses.length),
            ]);
        }
        setAddAddressFormView(true);

        if (
            defaultAddresses &&
            !checkboxUseAddressAsDefault &&
            typeAddresses &&
            defaultAddresses[0].id === typeAddresses[changeAddressIndex].id
        ) {
            setDefaultAddresses([
                getTypeAddress(response.body)[changeAddressIndex],
            ]);
        }
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
