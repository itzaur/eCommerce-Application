export const checkIncorrectEmail = (
    e:
        | React.FocusEvent<HTMLInputElement, Element>
        | React.ChangeEvent<HTMLInputElement>,
    removeError?: Boolean
) => {
    if (removeError || e.target.value === '') {
        e.target.classList.remove('authorization__input_invalid');
        return false;
    }
    let regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!e.target.value.match(regexp)) {
        e.target.classList.add('authorization__input_invalid');
        return true;
    }
    return false;
};
