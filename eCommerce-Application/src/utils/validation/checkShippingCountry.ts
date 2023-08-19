export const checkIncorrectShippingCountry = (
    e: React.ChangeEvent<HTMLSelectElement>
): { incorrect: boolean; message: string } => {
    if (e.target.value === '') {
        return { incorrect: false, message: '' };
    }
    const { value } = e.target;
    if (value === 'Выберите страну*') {
        return {
            incorrect: true,
            message: 'Выберите страну',
        };
    }
    return { incorrect: false, message: '' };
};
