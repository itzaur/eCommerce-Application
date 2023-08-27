import { apiRoot } from './Client';
import { Category } from '../types';

export async function getCategories(): Promise<Category[] | undefined> {
    try {
        const categories = await apiRoot.categories().get().execute();
        const response = categories.body.results;
        const mainCategories = response.filter((el) => !el.parent);
        const subCategories = response.filter((el) => el.parent);
        const result: Category[] = [];
        mainCategories.forEach((el) => {
            const children = subCategories
                .filter((child) => child.parent?.id === el.id)
                .map((elem) => {
                    return {
                        name: elem.name['ru-RU'],
                        path: elem.slug['ru-RU'],
                    };
                });
            result.push({
                parent: { name: el.name['ru-RU'], path: el.slug['ru-RU'] },

                items: children,
            });
        });
        return result;
    } catch {
        //
    }
    return undefined;
}
