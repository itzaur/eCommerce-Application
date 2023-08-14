export const checkIncorrectPassword = (
    e:
        | React.FocusEvent<HTMLInputElement, Element>
        | React.ChangeEvent<HTMLInputElement>,
    removeError?: boolean
): { incorrect: boolean; message: string } => {
    if (removeError) {
        return { incorrect: false, message: '' };
    }
    if (e.target.value === '') {
        return { incorrect: true, message: 'Это обязательное поле' };
    }
    const { value } = e.target;
    if (value.length < 8) {
        return {
            incorrect: true,
            message: 'Пароль должен быть не менее 8 символов',
        };
    }
    if (!/[A-Z]/.test(value)) {
        return {
            incorrect: true,
            message:
                'Пароль должен содержать заглавную букву в диапазоне A - Z',
        };
    }
    if (!/[a-z]/.test(value)) {
        return {
            incorrect: true,
            message: 'Пароль должен содержать строчную букву в диапазоне a - z',
        };
    }
    if (!/\d/.test(value)) {
        return { incorrect: true, message: 'Пароль должен содержать цифру' };
    }
    if (!/[!@#$%^&*+]/.test(value)) {
        return {
            incorrect: true,
            message: 'Пароль должен содержать специальный символ !@#$%^&*+',
        };
    }
    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'Пароль не должен содержать начальных и конечных пробелов',
        };
    }
    return { incorrect: false, message: '' };
};
