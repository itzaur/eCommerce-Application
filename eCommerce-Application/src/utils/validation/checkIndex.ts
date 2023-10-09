import { countriesList } from '../constants';

export const checkIncorrectAddressIndex = (
    index: string,
    country: string
): { incorrect: boolean; message: string } => {
    if (index === '') {
        return { incorrect: false, message: '' };
    }

    const found = countriesList.find((el) => el.name === country);
    if (found && !found?.regularForIndex.test(index)) {
        return {
            incorrect: true,
            message: found?.indexError,
        };
    }

    if (/^\s/.test(index) || /\s$/.test(index)) {
        return {
            incorrect: true,
            message: 'Индекс не должен содержать начальных и конечных пробелов',
        };
    }

    return { incorrect: false, message: '' };
};
