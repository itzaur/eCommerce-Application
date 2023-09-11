import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from './Client';
import { CategoryCustom } from '../types';
import { serverErrorMessage } from '../utils/constants';

export async function getCategories(): Promise<CategoryCustom[]> {
    try {
        const categories = await apiRoot.categories().get().execute();
        const response: Category[] = categories.body.results;
        const mainCategories: Category[] = response.filter((el) => !el.parent);
        const subCategories: Category[] = response.filter((el) => el.parent);
        const result: CategoryCustom[] = [];
        return mainCategories.reduce((acc, mainCategory) => {
            const children = subCategories
                .filter((child) => child.parent?.id === mainCategory.id)
                .map((subCategory) => {
                    return {
                        name: subCategory.name['ru-RU'],
                        path: subCategory.slug['ru-RU'],
                        id: subCategory.id,
                    };
                });
            acc.push({
                parent: {
                    name: mainCategory.name['ru-RU'],
                    path: mainCategory.slug['ru-RU'],
                    id: mainCategory.id,
                },

                items: children,
            });
            return acc;
        }, result);
    } catch {
        throw new Error(serverErrorMessage);
    }
}
