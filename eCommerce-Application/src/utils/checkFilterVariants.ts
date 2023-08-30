import { ProductProjection } from '@commercetools/platform-sdk';

export function checkFilterVariants(cards: ProductProjection[]): string[] {
    const tempArr: string[] = [];
    cards.forEach((el) => {
        if (el.masterVariant.attributes) {
            tempArr.push(el.masterVariant.attributes[0].value);
        }
    });
    const variants = [...new Set(tempArr)];
    return variants;
}
