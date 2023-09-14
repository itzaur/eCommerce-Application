import { Link } from 'react-router-dom';

function BreadCrumbs(props: {
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    selectedTypePath: string;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    selectedCategoryPath: string;
    selectedProduct: string;
    selectedProductPath: string;
    setIsFetching: CallableFunction;
    setCurrentPage: CallableFunction;
    setIsBreadCrumbsClicked: CallableFunction;
}): JSX.Element {
    const {
        selectedType,
        setSelectedType,
        selectedTypePath,
        selectedCategory,
        setSelectedCategory,
        selectedCategoryPath,
        selectedProduct,
        selectedProductPath,
        setIsFetching,
        setCurrentPage,
        setIsBreadCrumbsClicked,
    } = props;

    return (
        <ul
            className={
                selectedProduct
                    ? 'bread-crumbs bread-crumbs_product-page '
                    : 'bread-crumbs'
            }
        >
            <li>
                <Link to="/">Главная /</Link>
            </li>
            <li>
                <Link
                    to="/store"
                    onClick={(): void => {
                        setIsFetching(true);
                        setIsBreadCrumbsClicked(true);

                        setSelectedType('');
                        setSelectedCategory('');
                        setCurrentPage(0);
                        (
                            document.querySelectorAll(
                                '.sidebar__category_active'
                            ) as NodeListOf<HTMLElement>
                        ).forEach((el) => {
                            el.classList.remove('sidebar__category_active');
                        });
                    }}
                >
                    Каталог
                </Link>
            </li>
            {selectedType && (
                <li>
                    <Link
                        to={`/store/${selectedTypePath}`}
                        onClick={(): void => {
                            setIsFetching(true);
                            setIsBreadCrumbsClicked(true);

                            setSelectedCategory('');

                            (
                                document.querySelectorAll(
                                    '.sidebar__category_active'
                                ) as NodeListOf<HTMLElement>
                            ).forEach((el) => {
                                el.classList.remove('sidebar__category_active');
                            });
                        }}
                    >
                        / {selectedType}{' '}
                    </Link>
                </li>
            )}
            {selectedCategory && (
                <li>
                    <Link
                        to={`/store/${selectedTypePath}/${selectedCategoryPath}`}
                        onClick={(): void => {
                            setIsFetching(true);
                            setIsBreadCrumbsClicked(true);

                            setSelectedType(selectedType);
                            setSelectedCategory(selectedCategory);

                            (
                                document.querySelectorAll(
                                    '.sidebar__category_active'
                                ) as NodeListOf<HTMLElement>
                            ).forEach((el) => {
                                el.classList.remove('sidebar__category_active');
                            });
                        }}
                    >
                        / {selectedCategory}
                    </Link>
                </li>
            )}
            {selectedProduct && (
                <li>
                    <Link
                        to={`/store${
                            selectedTypePath ? `/${selectedTypePath}` : ''
                        }${
                            selectedCategoryPath
                                ? `/${selectedCategoryPath}`
                                : ''
                        }/${selectedProductPath}`}
                    >
                        / {selectedProduct}
                    </Link>
                </li>
            )}
        </ul>
    );
}

export default BreadCrumbs;
