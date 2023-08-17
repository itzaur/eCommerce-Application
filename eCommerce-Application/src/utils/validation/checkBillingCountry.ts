export const checkIncorrectBillingCountry = (
    e:
        | React.FocusEvent<HTMLSelectElement, Element>
        | React.ChangeEvent<HTMLSelectElement>,
    removeError?: boolean
): { incorrect: boolean; message: string } => {
    if (removeError || e.target.value === '') {
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
