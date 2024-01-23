import { CategoryCustom, LoaderStoreResult } from '../types';

export function checkSelectedTypeCategory(
    sideBarList: CategoryCustom[]
): LoaderStoreResult {
    const type = window.location.pathname.split('/')[2] || '';
    const category = window.location.pathname.split('/')[3] || '';

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
