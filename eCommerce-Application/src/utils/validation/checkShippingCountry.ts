export const checkIncorrectShippingCountry = (
    e: React.ChangeEvent<HTMLSelectElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

    if (value === 'Выберите страну*') {
        return {
            incorrect: true,
            message: 'Выберите страну',
        };
    }

    return { incorrect: false, message: '' };
};

export const checkIncorrectCountry = (
    e: string
): { incorrect: boolean; message: string } => {
    if (e === '') {
        return { incorrect: false, message: '' };
    }

    if (e === 'Выберите страну*') {
        return {
            incorrect: true,
            message: 'Выберите страну',
        };
    }

    return { incorrect: false, message: '' };
};
