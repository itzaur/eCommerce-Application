import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { FilterSortSearchParameters } from '../../types';

export const memoizedCatalogParams = createSelector(
    [(state: RootState): FilterSortSearchParameters => state.catalog],
    (catalog) => catalog,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);

export const memoizedSelectedCategoryType = createSelector(
    [
        (
            state: RootState
        ): {
            selectedCategoryId: string;
            attributesToFilter: {
                name: string;
                key: string;
            };
        } => state.catalog.categoryType,
    ],
    (selectedCategoryType) => selectedCategoryType,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);
export const memoizedMinSelectedPrice = createSelector(
    [(state: RootState): number => state.catalog.minSelectedPrice],
    (minSelectedPrice) => minSelectedPrice,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);
export const memoizedMaxSelectedPrice = createSelector(
    [(state: RootState): number => state.catalog.maxSelectedPrice],
    (maxSelectedPrice) => maxSelectedPrice,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);

export const memoizedSelectedFiltersList = createSelector(
    [(state: RootState): string[] => state.catalog.selectedFiltersList],
    (selectedFiltersList) => selectedFiltersList,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);

export const memoizedAttributesToSort = createSelector(
    [
        (
            state: RootState
        ): { order: string; value: string; icon: string } | undefined =>
            state.catalog.attributesToSort,
    ],
    (attributesToSort) => attributesToSort,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);

export const memoizedAttributesToSearch = createSelector(
    [
        (state: RootState): string | undefined =>
            state.catalog.attributesToSearch,
    ],
    (attributesToSearch) => attributesToSearch,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);

export const memoizedDiscountedProducts = createSelector(
    [
        (state: RootState): boolean | undefined =>
            state.catalog.discountedProducts,
    ],
    (discountedProducts) => discountedProducts,
    {
        devModeChecks: { identityFunctionCheck: 'never' },
    }
);
