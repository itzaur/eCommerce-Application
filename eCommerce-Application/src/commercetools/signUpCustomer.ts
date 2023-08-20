import { apiRoot } from './Client';

export async function signUpCustomer(
    userName: string,
    name: string,
    surname: string,
    password: string,
    email: string,
    countryShipping: string,
    shippingRegion: string,
    shippingCity: string,
    shippingIndex: string,
    shippingStreet: string,
    countryBilling: string,
    billingRegion: string,
    billingCity: string,
    billingIndex: string,
    billingStreet: string,
    birthDay: string,
    birthMonth: string,
    birthYear: string,
    formLife: string,
    defaultShippingAddress: boolean,
    defaultBillingAddress: boolean
): Promise<void> {
    let countryShippingAbbr = '';
    let countryBillingAbbr = '';
    const countriesAbbr = [
        { long: 'Россия', short: 'RU' },
        { long: 'Беларусь', short: 'BY' },
        { long: 'Польша', short: 'PL' },
    ];
    countriesAbbr.forEach((el) => {
        if (el.long === countryShipping) countryShippingAbbr = el.short;
        if (el.long === countryBilling) countryBillingAbbr = el.short;
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
        if (error.message === 'The provided value is not a valid email') {
            throw new Error('Введите e-mail в верном формате', {
                cause: 'emailError',
            });
        }
        if (error.message === `'password' should not be empty.`) {
            throw new Error('Введите пароль в верном формате', {
                cause: 'passwordError',
            });
        } else if (
            error.message ===
            'There is already an existing customer with the provided email.'
        ) {
            throw new Error('Данный e-mail уже существует в системе', {
                cause: 'emailError',
            });
        } else {
            throw new Error('Сервер улетел в космос, попробуйте позже', {
                cause: 'serverError',
            });
        }
    }
}
