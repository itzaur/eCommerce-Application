import { NavLink, useNavigate } from 'react-router-dom';
import { CategoryCustom } from '../../types';

interface SideBarProps {
    sideBarList: CategoryCustom[];
    selectedType: CategoryCustom | '';
    selectedCategory: CategoryCustom['items'][0] | '';
}

function SideBar(props: SideBarProps): JSX.Element {
    const { sideBarList, selectedType, selectedCategory } = props;
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <div className="sidebar__content">
                {sideBarList.map((category) => (
                    <div className="sidebar__item" key={category.parent.name}>
                        <button
                            className="btn"
                            type="button"
                            onClick={(): void =>
                                navigate(`/store/${category.parent.path}`)
                            }
                        >
                            <NavLink
                                id={category.parent.id}
                                to={`/store/${category.parent.path}`}
                                className={
                                    selectedType &&
                                    selectedType.parent.id ===
                                        category.parent.id
                                        ? 'sidebar__category_active sidebar__title'
                                        : 'sidebar__title'
                                }
                            >
                                {String(category.parent.name)}
                            </NavLink>
                        </button>

                        <div className="sidebar__btns">
                            {category.items.map((el) => (
                                <button key={el.path} type="button">
                                    <NavLink
                                        id={el.id}
                                        to={`/store/${category.parent.path}/${el.path}`}
                                        className={
                                            selectedCategory &&
                                            selectedCategory.id === el.id
                                                ? 'sidebar__category_active sidebar__category'
                                                : 'sidebar__category'
                                        }
                                        key={el.name}
                                        type="button"
                                    >
                                        {el.name}
                                    </NavLink>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default SideBar;
