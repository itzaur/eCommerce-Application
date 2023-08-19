export const checkIncorrectEmail = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    if (e.target.value === '') {
        return { incorrect: false, message: '' };
    }
    const regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!e.target.value.match(regexp)) {
        return { incorrect: true, message: 'Введите e-mail в верном формате' };
    }
    return { incorrect: false, message: '' };
};
