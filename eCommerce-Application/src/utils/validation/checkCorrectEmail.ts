import { regexpEmail } from '../constants';

export const checkIncorrectEmail = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    if (e.target.value === '') {
        return { incorrect: false, message: '' };
    }

    if (!e.target.value.match(regexpEmail)) {
        return { incorrect: true, message: 'Введите e-mail в верном формате' };
    }

    return { incorrect: false, message: '' };
};
