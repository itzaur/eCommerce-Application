import { apiRoot } from './Client';
import {
    serverErrorMessage,
    countriesList,
    errorEmailExist,
    errorEmailValidation,
    errorPasswordValidation,
} from '../utils/constants';
import { RegistrationParams } from '../types';

export async function signUpCustomer(props: RegistrationParams): Promise<void> {
    const {
        userName,
        name,
        surname,
        password,
        email,
        countryShipping,
        shippingRegion,
        shippingCity,
        shippingIndex,
        shippingStreet,
        countryBilling,
        billingRegion,
        billingCity,
        billingIndex,
        billingStreet,
        birthDay,
        birthMonth,
        birthYear,
        formLife,
        defaultShippingAddress,
        defaultBillingAddress,
    } = props;
    let countryShippingAbbr = '';
    let countryBillingAbbr = '';

    countriesList.forEach((el) => {
        if (el.name === countryShipping) countryShippingAbbr = el.abbr;
        if (el.name === countryBilling) countryBillingAbbr = el.abbr;
    });
    try {
        await apiRoot
            .customers()
            .post({
                body: {
                    email,
                    password,
                    addresses: [
                        {
                            country: countryShippingAbbr,
                            region: shippingRegion,
                            city: shippingCity,
                            postalCode: shippingIndex,
                            streetName: shippingStreet,
                        },
                        {
                            country: countryBillingAbbr,
                            region: billingRegion,
                            city: billingCity,
                            postalCode: billingIndex,
                            streetName: billingStreet,
                        },
                    ],
                    shippingAddresses: [0],
                    billingAddresses: [1],
                    defaultShippingAddress: defaultShippingAddress
                        ? 0
                        : undefined,
                    defaultBillingAddress: defaultBillingAddress
                        ? 1
                        : undefined,
                    title: userName,
                    firstName: name,
                    lastName: surname,
                    salutation: `Привет, ${formLife} ${name}!`,
                    dateOfBirth: `${birthYear}-${birthMonth}-${birthDay}`,
                },
            })
            .execute();
    } catch (e) {
        const error = e as Error;
        switch (error.message) {
            case 'The provided value is not a valid email': {
                throw new Error(errorEmailValidation, {
                    cause: 'emailError',
                });
            }
            case `'password' should not be empty.`: {
                throw new Error(errorPasswordValidation, {
                    cause: 'passwordError',
                });
            }
            case 'There is already an existing customer with the provided email.': {
                throw new Error(errorEmailExist, {
                    cause: 'emailError',
                });
            }
            default: {
                throw new Error(serverErrorMessage, {
                    cause: 'serverError',
                });
            }
        }
    }
}
