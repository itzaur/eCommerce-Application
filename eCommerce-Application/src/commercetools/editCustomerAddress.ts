import { Address } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { countriesList } from '../utils/constants';
import { EditCustomerAddressParams } from '../types';

export async function editCustomerAddress(
    props: EditCustomerAddressParams
): Promise<void> {
    const {
        ID,
        country,
        regionValue,
        cityValue,
        indexValue,
        streetValue,
        checkboxUseAddressAsDefault,
        version,
        setVersion,
        setAddAddressFormView,
        setTypeAddresses,
        addressId,
        addressTypeView,
        setDefaultAddresses,
        changeAddressIndex,
        getTypeAddress,
        typeAddresses,
        defaultAddresses,
    } = props;
    const countryShippingAbbr =
        countriesList.find((el) => el.name === country)?.abbr || '';

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
            setTypeAddresses((addresses: Address[]) => {
                const tempAddresses = addresses;
                tempAddresses[changeAddressIndex] = getTypeAddress(
                    response.body
                )[changeAddressIndex];
                return tempAddresses;
            });
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
