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
            message: 'Дата не должна содержать начальных и конечных пробелов',
        };
    }
    if (value.trim().length < 1) {
        return {
            incorrect: true,
            message: 'Дата не может быть пустой',
        };
    }
    if (value.trim().length >= 3) {
        return {
            incorrect: true,
            message: 'Дата не может быть больше 2 цифр',
        };
    }
    if (!/^\d+$/.test(value)) {
        return {
            incorrect: true,
            message: 'Дата должна содердажать только цифры',
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
    if (value.trim().length >= 3) {
        return {
            incorrect: true,
            message: 'Месяц не может быть больше 2 цифр',
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
    if (value.trim().length > 4) {
        return {
            incorrect: true,
            message: 'Год не может быть больше 4 цифр',
        };
    }
    if (value.trim().length < 4) {
        return {
            incorrect: true,
            message: 'Год не может быть меньше 4 цифр',
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

    // if (
    //     day instanceof HTMLInputElement &&
    //     month instanceof HTMLInputElement &&
    //     year instanceof HTMLInputElement
    // ) {
    const dayValue = Number(day!.value);
    const dayMonth = Number(month!.value);
    const dayYear = Number(year!.value);

    if (dayValue > curDay) {
        curDay += monthDays[dayMonth - 1];
        curMonth -= 1;
    }
    if (dayMonth > curMonth) {
        curMonth += 12;
        curYear -= 1;
    }
    // const resDay = curDay - dayValue;
    // const resMonth = curMonth - dayMonth;
    const resYear = curYear - dayYear;
    // console.log(resYear);
    return resYear;
    // }
    // return undefined;
};

export const checkIncorrectAge = () // e:
//     | React.FocusEvent<HTMLInputElement, Element>
//     | React.ChangeEvent<HTMLInputElement>,
// removeError?: boolean
: { incorrect: boolean; message: string } => {
    // if (removeError) {
    //     return { incorrect: false, message: '' };
    // }
    // const { value } = e.target;
    if (getAge() < 18) {
        return {
            incorrect: true,
            message: 'Вам нет 18 лет',
        };
    }
    return { incorrect: false, message: '' };
};
