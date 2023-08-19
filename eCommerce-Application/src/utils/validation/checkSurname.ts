export const checkIncorrectSurname = (
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
            message:
                'Фамилия не должна содержать начальных и конечных пробелов',
        };
    }
    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Фамилия должна содержать минимум 1 символ',
        };
    }
    if (!/^[a-zA-ZА-Яа-яёЁ]+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Фамилия должна содердажать только буквы',
        };
    }

    return { incorrect: false, message: '' };
};
