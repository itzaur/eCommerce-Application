const maxletterCount = 2;
const maxletterYearCount = 4;
const validUserAge = 18;
const minValidYear = 1900;
const maxValidYear = 2024;

const maxCountDaysPerMonth = 31;
const minCountDaysPerMonth = 1;

const maxCountMonthPerYear = 12;
const minCountMonthPerYear = 1;

export const checkIncorrectBirthDay = (
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
            message: 'День не должнен содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'День не может быть пустой',
        };
    }

    if (value.trim().length > maxletterCount) {
        return {
            incorrect: true,
            message: 'День не может быть больше 2 цифр',
        };
    }

    if (
        Number(value.trim()) > maxCountDaysPerMonth ||
        Number(value.trim()) < minCountDaysPerMonth
    ) {
        return {
            incorrect: true,
            message: 'День должнен быть в диапазоне 1 - 31',
        };
    }

    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'День должен содердажать только цифры',
        };
    }

    return { incorrect: false, message: '' };
};

export const checkIncorrectBirthMonth = (
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
            message: 'Месяц не должнен содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Месяц не может быть пустой',
        };
    }

    if (value.trim().length > maxletterCount) {
        return {
            incorrect: true,
            message: 'Месяц не может быть больше 2 цифр',
        };
    }
    if (
        Number(value.trim()) > maxCountMonthPerYear ||
        Number(value.trim()) < minCountMonthPerYear
    ) {
        return {
            incorrect: true,
            message: 'Месяц должнен быть в диапазоне 1 - 12',
        };
    }

    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Месяц должна содердажать только цифры',
        };
    }

    return { incorrect: false, message: '' };
};

export const checkIncorrectBirthYear = (
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
            message: 'Год не должен содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Год не может быть пустой',
        };
    }

    if (value.trim().length > maxletterYearCount) {
        return {
            incorrect: true,
            message: 'Год не может быть больше 4 цифр',
        };
    }

    if (value.trim().length < maxletterYearCount) {
        return {
            incorrect: true,
            message: 'Год не может быть меньше 4 цифр',
        };
    }

    if (
        Number(value.trim()) < minValidYear ||
        Number(value.trim()) >= maxValidYear
    ) {
        return {
            incorrect: true,
            message: 'Год должнен быть в диапазоне 1900 - 2023',
        };
    }

    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Год должен содердажать только цифры',
        };
    }

    return { incorrect: false, message: '' };
};

export const getAge = (): number => {
    const day = document.querySelector('#birth-day') as HTMLInputElement;
    const month = document.querySelector('#birth-month') as HTMLInputElement;
    const year = document.querySelector('#birth-year') as HTMLInputElement;

    const curDate = new Date();

    let curDay = curDate.getDate();
    let curMonth = 1 + curDate.getMonth();
    let curYear = curDate.getFullYear();

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const dayValue = Number(day!.value);
    const dayMonth = Number(month!.value);
    const dayYear = Number(year!.value);

    if (dayValue > curDay) {
        curDay += monthDays[dayMonth - 1];
        curMonth -= 1;
    }

    if (dayMonth > curMonth) {
        curMonth += maxCountMonthPerYear;
        curYear -= 1;
    }
    const resYear = curYear - dayYear;

    return resYear;
};

export const checkIncorrectAge = (): {
    incorrect: boolean;
    message: string;
} => {
    if (getAge() < validUserAge) {
        return {
            incorrect: true,
            message: 'Вам нет 18 лет',
        };
    }
    return { incorrect: false, message: '' };
};
