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
