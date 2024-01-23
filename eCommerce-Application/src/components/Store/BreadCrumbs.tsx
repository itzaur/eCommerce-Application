/* eslint-disable react/require-default-props */
import { NavLink } from 'react-router-dom';
import { CategoryCustom } from '../../types';

interface BreadCrumbsProps {
    selectedType: CategoryCustom | '';
    selectedCategory: CategoryCustom['items'][0] | '';
    selectedProduct?: string;
}

function BreadCrumbs(props: BreadCrumbsProps): JSX.Element {
    const { selectedType, selectedCategory, selectedProduct } = props;

    return (
        <ul
            className={
                selectedProduct
                    ? 'bread-crumbs bread-crumbs_product-page '
                    : 'bread-crumbs'
            }
        >
            <li>
                <NavLink to="/">Главная /</NavLink>
            </li>
            <li>
                <NavLink
                    to="/store"
                    className={
                        !selectedType && !selectedCategory
                            ? 'sidebar__category_active'
                            : ''
                    }
                >
                    Каталог
                </NavLink>
            </li>
            {selectedType && (
                <li>
                    <NavLink
                        to={`/store/${selectedType.parent.path}`}
                        className={
                            selectedType && !selectedCategory
                                ? 'sidebar__category_active'
                                : ''
                        }
                    >
                        / {selectedType.parent.name}
                    </NavLink>
                </li>
            )}
            {selectedCategory && selectedType && (
                <li>
                    <NavLink
                        to={`/store/${selectedType.parent.path}?category=${selectedCategory.path}`}
                        className={
                            selectedType && selectedCategory
                                ? 'sidebar__category_active'
                                : ''
                        }
                    >
                        / {selectedCategory.name}
                    </NavLink>
                </li>
            )}
            {/* {selectedProduct && (
                <li>
                    <NavLink
                        to={`/store${
                            selectedTypePath ? `/${selectedTypePath}` : ''
                        }${
                            selectedCategoryPath
                                ? `/${selectedCategoryPath}`
                                : ''
                        }/${selectedProductPath}`}
                    >
                        / {selectedProduct}
                    </NavLink>
                </li>
            )}  */}
        </ul>
    );
}

export default BreadCrumbs;
