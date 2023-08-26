export function getCountry(
    country: string | undefined
): 'Россия' | 'Беларусь' | 'Польша' | undefined {
    if (country === 'RU') {
        return 'Россия';
    }
    if (country === 'BY') {
        return 'Беларусь';
    }
    if (country === 'PL') {
        return 'Польша';
    }
    return undefined;
}
