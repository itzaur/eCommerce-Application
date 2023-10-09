import { countries } from '../constants';

export const checkIncorrectBillingCountry = (
    e: React.ChangeEvent<HTMLSelectElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

    if (value === countries[0]) {
        return {
            incorrect: true,
            message: countries[0].slice(0, -1),
        };
    }

    return { incorrect: false, message: '' };
};
