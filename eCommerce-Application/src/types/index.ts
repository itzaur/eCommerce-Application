import { Cart, Address, ProductProjection } from '@commercetools/platform-sdk';

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

export type GetCardsApiParams = {
    parameters: FilterSortSearchParameters;
    currentOffset: number;
    itemsPerPage: number;
};

export type GetCardsApiResults = {
    cards: ProductProjection[];
};

export type LoaderStoreResult = {
    sideBarList: CategoryCustom[];
    selectedTypeUpdated: CategoryCustom | '';
    selectedCategoryUpdated: CategoryCustom['items'][0] | '';
};

export type GetProductsParametersApiResults = {
    countCards: number;
    filterVariants: string[];
    minPrice: number;
    maxPrice: number;
};

export type FilterSortSearchParameters = {
    categoryType: {
        selectedCategoryId: string;
        attributesToFilter: { name: string; key: string };
    };
    selectedFiltersList: string[];
    minSelectedPrice: number;
    maxSelectedPrice: number;
    attributesToSort?: {
        order: string;
        value: string;
        icon: string;
    };
    attributesToSearch?: string;
    discountedProducts?: boolean;
    currentOffset: number;
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

export type RegistrationParams = {
    userName: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    countryShipping: string;
    shippingRegion: string;
    shippingCity: string;
    shippingIndex: string;
    shippingStreet: string;
    countryBilling: string;
    billingRegion: string;
    billingCity: string;
    billingIndex: string;
    billingStreet: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    formLife: string;
    defaultShippingAddress: boolean;
    defaultBillingAddress: boolean;
};

export type EditCustomerAddressParams = {
    ID: string;
    country: string;
    regionValue: string;
    cityValue: string;
    indexValue: string;
    streetValue: string;
    checkboxUseAddressAsDefault: boolean;
    version: number;
    setVersion: CallableFunction;
    setAddAddressFormView: CallableFunction;
    setTypeAddresses: CallableFunction;
    addressId: string;
    addressTypeView: boolean;
    setDefaultAddresses: CallableFunction;
    changeAddressIndex: number;
    getTypeAddress: CallableFunction;
    typeAddresses?: Address[];
    defaultAddresses?: Address[];
};

export type UpdateCartParams = {
    cartData: Cart | null;
    mode: UpdateCartMode;
    cardId: string;
    quantity: number;
    firstFunctionCall: boolean;
};
export type UpdateCartMode = 'new' | 'update' | 'remove';
