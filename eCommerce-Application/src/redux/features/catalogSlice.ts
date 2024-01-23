/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { FilterSortSearchParameters } from '../../types';

const initialState: FilterSortSearchParameters = {
    categoryType: {
        selectedCategoryId: '',
        attributesToFilter: { name: '', key: '' },
    },
    selectedFiltersList: [],
    minSelectedPrice: 0,
    maxSelectedPrice: 0,
    attributesToSort: {
        order: '',
        value: 'По умолчанию',
        icon: '↓↑',
    },
    attributesToSearch: '',
    discountedProducts: false,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setCategoryType(state, action) {
            state.categoryType = action.payload;
            state.maxSelectedPrice = 0;
            state.minSelectedPrice = 0;
            state.discountedProducts = false;
            state.selectedFiltersList = [];
        },

        setSelectedFiltersList(state, action) {
            state.selectedFiltersList = action.payload;
        },
        setMinSelectedPrice(state, action) {
            state.minSelectedPrice = action.payload;
        },
        setMaxSelectedPrice(state, action) {
            state.maxSelectedPrice = action.payload;
        },

        setAttributesToSort(state, action) {
            state.attributesToSort = action.payload;
        },
        setAttributesToSearch(state, action) {
            state.attributesToSearch = action.payload;
        },
        setDiscountedProducts(state, action) {
            state.discountedProducts = action.payload;
        },
    },
});

export const {
    setCategoryType,
    setAttributesToSearch,
    setAttributesToSort,
    setDiscountedProducts,
    setMaxSelectedPrice,
    setMinSelectedPrice,
    setSelectedFiltersList,
} = searchSlice.actions;
export default searchSlice.reducer;
