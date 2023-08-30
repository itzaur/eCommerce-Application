export type ModalProps = {
    active: boolean;
    setActive(arg: boolean): void;
    children: React.ReactNode;
};
export type Category = {
    parent: { name: string; path: string; id: string };
    items: { name: string; path: string; id: string }[];
};

export type FilterSortSearcParameters = {
    selectedCategoryId: string;
    filter: string;
    selectedCategoriesList: string[];
    minSelectedPrice: number;
    maxSelectedPrice: number;
    sort?: string;
    searchValue?: string;
};
