const letterCount = 3;

export const checkIncorrectFormLife = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'поле не должно содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < letterCount) {
        return {
            incorrect: true,
            message: 'поле должно содержать минимум 3 символа',
        };
    }

    if (!/^[a-zA-ZА-Яа-яёЁ]+$/.test(value)) {
        return {
            incorrect: true,
            message: 'поле должно содержать только буквы',
        };
    }

    return { incorrect: false, message: '' };
};
