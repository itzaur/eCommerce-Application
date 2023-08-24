// import { useState, useEffect } from 'react';
// import { getProductsByProductType } from '../../commercetools/getProductsByType';

function Cards({ cards }): JSX.Element {
    return (
        <div>
            {cards.map((card, i: number) => (
                <div key={i}>{card.key}</div>
            ))}
        </div>
    );
}

export default Cards;
