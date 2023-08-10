export const checkIncorrectPassword = (
    e:
        | React.FocusEvent<HTMLInputElement, Element>
        | React.ChangeEvent<HTMLInputElement>,
    removeError?: boolean
) => {
    if (removeError || e.target.value === '') {
        e.target.classList.remove('authorization__input_invalid');
        return { incorrect: false, message: '' };
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
    if (!/[!@#$%^&*]/.test(value)) {
        return {
            incorrect: true,
            message: 'Пароль должен содержать специальный символ !@#$%^&*',
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
