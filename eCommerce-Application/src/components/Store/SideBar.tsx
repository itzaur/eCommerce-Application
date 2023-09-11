import { Link } from 'react-router-dom';
import { CategoryCustom } from '../../types';

function SideBar(props: {
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTypePath: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategoryPath: React.Dispatch<React.SetStateAction<string>>;
    categories: CategoryCustom[];
}): JSX.Element {
    const {
        categories,
        setSelectedType,
        setSelectedCategory,
        setSelectedCategoryId,
        setSelectedCategoryPath,
        setSelectedTypePath,
    } = props;

    return (
        <aside className="sidebar">
            <div className="sidebar__content">
                {categories.map((category) => (
                    <div className="sidebar__item" key={category.parent.name}>
                        <button className="btn" type="button">
                            <Link
                                id={category.parent.id}
                                className="sidebar__title"
                                to={`/store/${category.parent.path}`}
                                onClick={(e): void => {
                                    setSelectedCategory('');
                                    setSelectedType(category.parent.name);
                                    setSelectedTypePath(category.parent.path);
                                    if (e.target instanceof HTMLElement) {
                                        (
                                            document.querySelectorAll(
                                                '.sidebar__category_active'
                                            ) as NodeListOf<HTMLElement>
                                        ).forEach((el) => {
                                            el.classList.remove(
                                                'sidebar__category_active'
                                            );
                                        });
                                        e.target.classList.add(
                                            'sidebar__category_active'
                                        );
                                    }
                                }}
                            >
                                {String(category.parent.name)}
                            </Link>
                        </button>

                        <div className="sidebar__btns">
                            {category.items.map((el) => (
                                <button key={el.path} type="button">
                                    <Link
                                        id={el.id}
                                        to={`/store/${category.parent.path}/${el.path}`}
                                        className="sidebar__category"
                                        key={el.name}
                                        type="button"
                                        onClick={(e): void => {
                                            setSelectedType(
                                                category.parent.name
                                            );
                                            setSelectedTypePath(
                                                category.parent.path
                                            );
                                            setSelectedCategory(el.name);
                                            setSelectedCategoryId(el.id);
                                            setSelectedCategoryPath(el.path);
                                            if (
                                                e.target instanceof HTMLElement
                                            ) {
                                                (
                                                    document.querySelectorAll(
                                                        '.sidebar__category_active'
                                                    ) as NodeListOf<HTMLElement>
                                                ).forEach((elem) => {
                                                    elem.classList.remove(
                                                        'sidebar__category_active'
                                                    );
                                                });
                                                e.target.classList.add(
                                                    'sidebar__category_active'
                                                );
                                            }
                                        }}
                                    >
                                        {el.name}
                                    </Link>
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
