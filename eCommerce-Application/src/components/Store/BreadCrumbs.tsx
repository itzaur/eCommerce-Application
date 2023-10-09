/* eslint-disable react/require-default-props */
import { Link } from 'react-router-dom';

function BreadCrumbs(props: {
    selectedType: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    selectedTypePath: string;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategoryId?: React.Dispatch<React.SetStateAction<string>>;
    selectedCategoryPath: string;
    selectedProduct: string;
    selectedProductPath: string;
    setIsFetching?: CallableFunction;
    setCurrentOffset?: CallableFunction;
    setIsBreadCrumbsClicked?: CallableFunction;
}): JSX.Element {
    const {
        selectedType,
        setSelectedType,
        selectedTypePath,
        selectedCategory,
        setSelectedCategory,
        setSelectedCategoryId,
        selectedCategoryPath,
        selectedProduct,
        selectedProductPath,
        setIsFetching,
        setCurrentOffset,
        setIsBreadCrumbsClicked,
    } = props;

    function clickBreadcrumbs(target: 'store' | 'type' | 'category'): void {
        if (setIsFetching) setIsFetching(true);
        if (setIsBreadCrumbsClicked) setIsBreadCrumbsClicked(true);
        (
            document.querySelectorAll(
                '.sidebar__category_active'
            ) as NodeListOf<HTMLElement>
        ).forEach((el) => {
            el.classList.remove('sidebar__category_active');
        });

        switch (target) {
            case 'store': {
                if (setCurrentOffset) setCurrentOffset(0);
                setSelectedType('');
                setSelectedCategory('');
                if (setSelectedCategoryId) setSelectedCategoryId('');
                break;
            }
            case 'type': {
                setSelectedCategory('');
                if (setSelectedCategoryId) setSelectedCategoryId('');
                break;
            }
            case 'category': {
                setSelectedType(selectedType);
                setSelectedCategory(selectedCategory);
                break;
            }
            default:
        }
    }

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
                        clickBreadcrumbs('store');
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
                            clickBreadcrumbs('type');
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
                            clickBreadcrumbs('category');
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
