export const checkIncorrectEmail = (
    e:
        | React.FocusEvent<HTMLInputElement, Element>
        | React.ChangeEvent<HTMLInputElement>,
    removeError?: boolean
): { incorrect: boolean; message: string } => {
    if (removeError || e.target.value === '') {
        return { incorrect: false, message: '' };
    }
    if (e.target.value === '') {
        return { incorrect: true, message: 'Это обязательное поле' };
    }
    const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!e.target.value.match(regexp)) {
        return { incorrect: true, message: 'Введите e-mail в верном формате' };
    }
    return { incorrect: false, message: '' };
};
