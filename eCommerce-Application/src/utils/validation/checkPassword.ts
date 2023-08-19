export const checkIncorrectPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    removeError?: boolean
): { incorrect: boolean; message: string } => {
    if (removeError || e.target.value === '') {
        return { incorrect: false, message: '' };
    }
    const { value } = e.target;
    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'Пароль не должен содержать начальных и конечных пробелов',
        };
    }
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
    return { incorrect: false, message: '' };
};
