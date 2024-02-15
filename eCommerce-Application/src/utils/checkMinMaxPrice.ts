import { ProductProjection } from '@commercetools/platform-sdk';

export function checkMinMaxPrice(cards: ProductProjection[]): number[] {
    const checkNonNullable = (el: number): boolean => el !== 0;
    const discountedPrices = cards
        .map((el) => {
            if (
                el.masterVariant.prices &&
                el.masterVariant.prices[0].discounted
            ) {
                return el.masterVariant.prices[0].discounted?.value.centAmount;
            }
            if (
                el.masterVariant.prices &&
                !el.masterVariant.prices[0].discounted
            ) {
                return 0;
            }

            return 0;
        })
        .filter(checkNonNullable);
    const prices = cards
        .map((el) => {
            return el?.masterVariant?.prices?.[0].value.centAmount || 0;
        })
        .filter(checkNonNullable);
    const minPriceDiscounted = Math.min(...discountedPrices) / 100;
    const maxPriceDiscounted = Math.max(...discountedPrices) / 100;
    const minPriceRegular = Math.min(...prices) / 100;
    const maxPriceRegular = Math.max(...prices) / 100;
    return [
        Math.min(minPriceDiscounted, minPriceRegular),
        Math.max(maxPriceDiscounted, maxPriceRegular),
    ];
}
