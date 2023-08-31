export type ModalProps = {
    active: boolean;
    setActive(arg: boolean): void;
    children: React.ReactNode;
    onClick(): void;
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
    discountedProducts?: boolean;
};

export interface ProductOptions {
    title: string;
    description: string | undefined;
    currency: string | undefined;
    price?: string | number;
    discount?: string | number;
    images: string[] | undefined;
    imageSrc: string;
    imageAlt: string | undefined;
    detailsTitle: string | undefined;
    detailsItems?: string[];
    reviewAutor?: string[];
    reviewText?: string[];
    reviews:
        | { autor: string; text: string; stars: number; starsEmpty: number }[]
        | undefined;
}
