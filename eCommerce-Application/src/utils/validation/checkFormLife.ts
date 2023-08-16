export const checkIncorrectFormLife = (
    e:
        | React.FocusEvent<HTMLInputElement, Element>
        | React.ChangeEvent<HTMLInputElement>,
    removeError?: boolean
): { incorrect: boolean; message: string } => {
    if (removeError || e.target.value === '') {
        return { incorrect: false, message: '' };
    }
    const { value } = e.target;
    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'поле не должно содержать начальных и конечных пробелов',
        };
    }
    if (value.trim().length < 3) {
        return {
            incorrect: true,
            message: 'поле должно содержать минимум 3 символа',
        };
    }
    return { incorrect: false, message: '' };
};
