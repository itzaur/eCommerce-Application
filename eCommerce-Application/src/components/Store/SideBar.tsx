import { Link } from 'react-router-dom';
import { categories } from '../../utils/constants';

function SideBar(props: {
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
    const { setSelectedType, setSelectedCategory } = props;
    return (
        <aside className="sidebar">
            {categories.map((category) => (
                <div className="sidebar__item" key={category.name}>
                    <button className="btn" type="button">
                        <Link
                            className="sidebar__title"
                            to="/store"
                            onClick={(): void => {
                                setSelectedCategory('');
                                setSelectedType(category.name);
                            }}
                        >
                            {category.name}
                        </Link>
                    </button>

                    <div className="sidebar__btns">
                        {category.items.map((el) => (
                            <button
                                className="btn"
                                key={el}
                                type="button"
                                onClick={(): void => {
                                    setSelectedCategory(el);
                                }}
                            >
                                {el}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </aside>
    );
}

export default SideBar;
