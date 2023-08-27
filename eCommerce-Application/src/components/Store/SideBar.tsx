import { Link } from 'react-router-dom';
import { Category } from '../../types';

function SideBar(props: {
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTypePath: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategoryPath: React.Dispatch<React.SetStateAction<string>>;
    categories: Category[];
}): JSX.Element {
    const {
        categories,
        setSelectedType,
        setSelectedCategory,
        setSelectedCategoryPath,
        setSelectedTypePath,
    } = props;
    return (
        <aside className="sidebar">
            {categories.map((category) => (
                <div className="sidebar__item" key={category.parent.name}>
                    <button className="btn" type="button">
                        <Link
                            className="sidebar__title"
                            to={`/store/${category.parent.path}`}
                            onClick={(): void => {
                                setSelectedCategory('');
                                setSelectedType(category.parent.name);
                                setSelectedTypePath(category.parent.path);
                            }}
                        >
                            {String(category.parent.name)}
                        </Link>
                    </button>

                    <div className="sidebar__btns">
                        {category.items.map((el) => (
                            <button key={el.path} type="button">
                                <Link
                                    to={`/store/${category.parent.path}/${el.path}`}
                                    className="sidebar__category"
                                    key={el.name}
                                    type="button"
                                    onClick={(): void => {
                                        setSelectedCategory(el.name);
                                        setSelectedCategoryPath(el.path);
                                    }}
                                >
                                    {el.name}
                                </Link>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </aside>
    );
}

export default SideBar;
