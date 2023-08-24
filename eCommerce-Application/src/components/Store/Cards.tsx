// import { useState, useEffect } from 'react';
// import { getProductsByProductType } from '../../commercetools/getProductsByType';
import { ProductProjection } from '@commercetools/platform-sdk';

function Cards({ cards }: Record<'cards', ProductProjection[]>): JSX.Element {
    return (
        <div>
            {cards.map((card, i: number) => (
                <div key={i}>{card.name['ru-RU']}</div>
            ))}
        </div>
    );
}

export default Cards;
