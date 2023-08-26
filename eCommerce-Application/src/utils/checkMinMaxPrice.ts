import { ProductProjection } from '@commercetools/platform-sdk';

export function checkMinMaxPrice(cards: ProductProjection[]): number[] {
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
        .filter((el) => el !== 0);
    const prices = cards
        .map((el) => {
            if (el.masterVariant.prices) {
                return el.masterVariant.prices[0].value.centAmount;
            }

            return 0;
        })
        .filter((el) => el !== 0);
    const minPriceDiscounted = Math.min(...discountedPrices) / 100;
    const maxPriceDiscounted = Math.max(...discountedPrices) / 100;
    const minPriceRegular = Math.min(...prices) / 100;
    const maxPriceRegular = Math.max(...prices) / 100;
    return [
        Math.min(minPriceDiscounted, minPriceRegular),
        Math.max(maxPriceDiscounted, maxPriceRegular),
    ];
}
