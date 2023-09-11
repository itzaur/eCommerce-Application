export function getCountry(
    country: string | undefined
): 'Россия' | 'Беларусь' | 'Польша' | undefined {
    switch (country) {
        case 'RU':
            return 'Россия';
        case 'BY':
            return 'Беларусь';
        case 'PL':
            return 'Польша';
        default:
            return undefined;
    }
}
