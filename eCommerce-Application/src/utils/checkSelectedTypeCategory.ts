import { CategoryCustom, LoaderStoreResult } from '../types';

export function checkSelectedTypeCategory(
    sideBarList: CategoryCustom[]
): LoaderStoreResult {
    const path = window.location.pathname.split('/');
    const found = sideBarList.find((type) => {
        return (
            type.parent.path === path.at(-1) ||
            type.items.find((item) => item.path === path.at(-1))
        );
    });
    if (!found) path.pop();

    const type = path[2] || '';
    const category = path[3] || '';

    let selectedType: CategoryCustom | '' = '';
    let selectedCategory: CategoryCustom['items'][0] | '' = '';

    if (type) {
        selectedType =
            type !== 'store'
                ? sideBarList.find((el) => el.parent.path === type) || ''
                : '';
    }
    if (type && category && selectedType) {
        selectedCategory =
            selectedType.items.find((el) => el.path === category) || '';
        if (!selectedCategory) throw new Error('Not Found');
    }

    return {
        sideBarList,
        selectedTypeUpdated: selectedType,
        selectedCategoryUpdated: selectedCategory,
    };
}
