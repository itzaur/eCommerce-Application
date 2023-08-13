export const checkIncorrectAddressIndex = (
    e:
        | React.FocusEvent<HTMLInputElement, Element>
        | React.ChangeEvent<HTMLInputElement>,
    country: string,
    removeError?: boolean
): { incorrect: boolean; message: string } => {
    if (removeError || e.target.value === '') {
        return { incorrect: false, message: '' };
    }
    const { value } = e.target;
    // console.log(country);
    if (country === 'Россия') {
        if (!/^\d{6}$/.test(value)) {
            return {
                incorrect: true,
                message: 'Формат индекса 6 цифр XXXYYY',
            };
        }
    }
    if (country === 'Беларусь') {
        if (!/^\d{6}$/.test(value)) {
            return {
                incorrect: true,
                message: 'Формат индекса 6 цифр XXXYYY',
            };
        }
    }
    if (country === 'Польша') {
        if (!/^\d{2}-\d{3}$/.test(value)) {
            return {
                incorrect: true,
                message: 'Формат индекса 5 цифр XY-ZZZ',
            };
        }
    }
    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'Индекс не должен содержать начальных и конечных пробелов',
        };
    }
    // if (value.trim().length < 1) {
    //     return {
    //         incorrect: true,
    //         message: 'Улица должна содержать минимум 1 символ',
    //     };
    // }
    return { incorrect: false, message: '' };
};
