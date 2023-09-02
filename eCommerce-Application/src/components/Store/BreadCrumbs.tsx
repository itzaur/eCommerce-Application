import { Link } from 'react-router-dom';

function BreadCrumbs(props: {
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    selectedTypePath: string;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedCategoryPath: string;
}): JSX.Element {
    const {
        selectedType,
        setSelectedType,
        selectedTypePath,
        selectedCategory,
        setSelectedCategory,
        selectedCategoryPath,
    } = props;

    return (
        <ul className="bread-crumbs">
            <li>
                <Link to="/">Главная /</Link>
            </li>
            <li>
                <Link
                    to="/store"
                    onClick={(): void => {
                        setSelectedType('');
                        setSelectedCategory('');
                    }}
                >
                    Каталог
                </Link>
            </li>
            {selectedType && (
                <li>
                    <Link
                        to={`/store/${selectedTypePath}`}
                        onClick={(): void => setSelectedCategory('')}
                    >
                        / {selectedType}{' '}
                    </Link>
                </li>
            )}
            {selectedCategory && (
                <li>
                    <Link
                        to={`/store/${selectedTypePath}/${selectedCategoryPath}`}
                    >
                        / {selectedCategory}
                    </Link>
                </li>
            )}
        </ul>
    );
}

export default BreadCrumbs;
