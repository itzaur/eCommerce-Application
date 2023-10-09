export const checkIncorrectUserName = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

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
