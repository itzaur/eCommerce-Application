import { Categories } from '../../types';

function Filters({
    categories,
}: Record<'categories', Categories[]>): JSX.Element {
    return <section>{categories[0].parent}</section>;
}

export default Filters;
