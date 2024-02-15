const maxLetterCount = 2;
const maxLetterYearCount = 4;
const validUserAge = 18;
const minValidYear = 1900;
const maxValidYear = 2024;

const maxCountDaysPerMonth = 31;
const minCountDaysPerMonth = 1;

const maxCountMonthPerYear = 12;
const minCountMonthPerYear = 1;

export const checkIncorrectBirthDay = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'День не должен содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'День не может быть пустой',
        };
    }

    if (value.trim().length > maxLetterCount) {
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
            message: 'День должен быть в диапазоне 1 - 31',
        };
    }

    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'День должен содержать только цифры',
        };
    }

    return { incorrect: false, message: '' };
};

export const checkIncorrectBirthMonth = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

    if (/^\s/.test(value) || /\s$/.test(value)) {
        return {
            incorrect: true,
            message: 'Месяц не должен содержать начальных и конечных пробелов',
        };
    }

    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Месяц не может быть пустой',
        };
    }

    if (value.trim().length > maxLetterCount) {
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
            message: 'Месяц должен быть в диапазоне 1 - 12',
        };
    }

    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Месяц должен содержать только цифры',
        };
    }

    return { incorrect: false, message: '' };
};

export const checkIncorrectBirthYear = (
    e: React.ChangeEvent<HTMLInputElement>
): { incorrect: boolean; message: string } => {
    const { value } = e.target;

    if (value === '') {
        return { incorrect: false, message: '' };
    }

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

    if (value.trim().length > maxLetterYearCount) {
        return {
            incorrect: true,
            message: 'Год не может быть больше 4 цифр',
        };
    }

    if (value.trim().length < maxLetterYearCount) {
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
            message: 'Год должен быть в диапазоне 1900 - 2024',
        };
    }

    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Год должен содержать только цифры',
        };
    }

    return { incorrect: false, message: '' };
};

export const getAge = (
    dayValue: number,
    dayMonth: number,
    dayYear: number
): number => {
    const curDate = new Date();

    let curDay = curDate.getDate();
    let curMonth = 1 + curDate.getMonth();
    let curYear = curDate.getFullYear();

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

export const checkIncorrectAge = (
    dayValue: number,
    dayMonth: number,
    dayYear: number
): {
    incorrect: boolean;
    message: string;
} => {
    if (getAge(dayValue, dayMonth, dayYear) < validUserAge) {
        return {
            incorrect: true,
            message: 'Вам нет 18 лет',
        };
    }
    return { incorrect: false, message: '' };
};
