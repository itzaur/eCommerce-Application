export const checkIncorrectAddressIndex = (
    index: string,
    country: string
): { incorrect: boolean; message: string } => {
    if (index === '') {
        return { incorrect: false, message: '' };
    }

    if (country === 'Россия') {
        if (!/^\d{6}$/.test(index)) {
            return {
                incorrect: true,
                message: 'Формат индекса 6 цифр XXXYYY',
            };
        }
    }

    if (country === 'Беларусь') {
        if (!/^\d{6}$/.test(index)) {
            return {
                incorrect: true,
                message: 'Формат индекса 6 цифр XXXYYY',
            };
        }
    }

    if (country === 'Польша') {
        if (!/^\d{2}-\d{3}$/.test(index)) {
            return {
                incorrect: true,
                message: 'Формат индекса 5 цифр XY-ZZZ',
            };
        }
    }

    if (/^\s/.test(index) || /\s$/.test(index)) {
        return {
            incorrect: true,
            message: 'Индекс не должен содержать начальных и конечных пробелов',
        };
    }

    return { incorrect: false, message: '' };
};
