import { countries } from '../constants';

export const checkIncorrectShippingCountry = (
    e: React.ChangeEvent<HTMLSelectElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    switch (value) {
        case '':
            return { incorrect: false, message: '' };
        case countries[0]:
            return {
                incorrect: true,
                message: countries[0].slice(0, -1),
            };
        default:
            return { incorrect: false, message: '' };
    }
};

export const checkIncorrectCountry = (
    e: string
): { incorrect: boolean; message: string } => {
    switch (e) {
        case '':
            return { incorrect: false, message: '' };
        case countries[0]:
            return {
                incorrect: true,
                message: countries[0].slice(0, -1),
            };
        default:
            return { incorrect: false, message: '' };
    }
};
