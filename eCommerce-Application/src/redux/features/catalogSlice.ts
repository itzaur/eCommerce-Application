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
    currentOffset: 0,
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
            state.currentOffset = 0;
        },

        setSelectedFiltersList(state, action) {
            state.selectedFiltersList = action.payload;
            state.currentOffset = 0;
        },
        setMinSelectedPrice(state, action) {
            state.minSelectedPrice = action.payload;
            state.currentOffset = 0;
        },
        setMaxSelectedPrice(state, action) {
            state.maxSelectedPrice = action.payload;
            state.currentOffset = 0;
        },

        setAttributesToSort(state, action) {
            state.attributesToSort = action.payload;
            state.currentOffset = 0;
        },
        setAttributesToSearch(state, action) {
            state.attributesToSearch = action.payload;
            state.currentOffset = 0;
        },
        setDiscountedProducts(state, action) {
            state.discountedProducts = action.payload;
            state.currentOffset = 0;
        },
        setCurrentOffset(state, action) {
            state.currentOffset = action.payload;
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
    setCurrentOffset,
} = searchSlice.actions;
export default searchSlice.reducer;
