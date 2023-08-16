export const checkIncorrectUserName = (
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
            message:
                'Имя пользователя не должно содержать начальных и конечных пробелов',
        };
    }
    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Имя пользователя должно содержать минимум 1 символ',
        };
    }
    return { incorrect: false, message: '' };
};
