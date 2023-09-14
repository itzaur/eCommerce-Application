import { Cart } from '@commercetools/platform-sdk';

export type ModalProps = {
    active: boolean;
    setActive(arg: boolean): void;
    children: React.ReactNode;
    onClick?: () => void;
};

export type CategoryCustom = {
    parent: { name: string; path: string; id: string };
    items: { name: string; path: string; id: string }[];
};

export type FilterSortSearcParameters = {
    selectedCategoryId: string;
    attributesToFilter: string;
    selectedFiltersList: string[];
    minSelectedPrice: number;
    maxSelectedPrice: number;
    attributesToSort?: string;
    attributesToSearch?: string;
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

export interface IAddress {
    city: string;
    country: string;
    id: string;
    postalCode: string;
    region: string;
    streetName: string;
}

export type UpdateCartParams = {
    cartData: Cart | null;
    mode: UpdateCartMode;
    cardId: string;
    quantity: number;
    firstFunctionCall: boolean;
};
export type UpdateCartMode = 'new' | 'update' | 'remove';
