export const checkIncorrectAddressStreet = (
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
            message: 'Улица не должена содержать начальных и конечных пробелов',
        };
    }
    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Улица должна содержать минимум 1 символ',
        };
    }
    return { incorrect: false, message: '' };
};

export const checkIncorrectAddressCity = (
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
            message: 'Город не должен содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Город должен содержать минимум 1 символ',
        };
    }
    if (!/^[a-zа-яё]+[\s-]?[a-zа-яё]*$/i.test(value)) {
        return {
            incorrect: true,
            message: 'Город должен содердажать только буквы',
        };
    }
    return { incorrect: false, message: '' };
};

export const checkIncorrectAddressRegion = (
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
                'Регнион не должен содержать начальных и конечных пробелов',
        };
    }
    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Регион должен содержать минимум 1 символ',
        };
    }
    if (!/^[a-zA-ZА-Яа-яёЁ]+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Регион должен содердажать только буквы',
        };
    }
    return { incorrect: false, message: '' };
};
