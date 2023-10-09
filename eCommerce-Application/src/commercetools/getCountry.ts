import { countriesList } from '../utils/constants';

export function getCountry(country: string): string {
    return countriesList.find((el) => el.abbr === country)?.name || '';
}
