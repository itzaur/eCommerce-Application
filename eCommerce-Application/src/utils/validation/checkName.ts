export const checkIncorrectName = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

    if (/^\s/.test(value) || /\s$/.test(value)) {
        e.preventDefault();
        return {
            incorrect: true,
            message: 'Имя не должно содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Имя должно содержать минимум 1 символ',
        };
    }

    if (!/^[a-zA-ZА-Яа-яёЁ]+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Имя должно содержать только буквы',
        };
    }

    return { incorrect: false, message: '' };
};
