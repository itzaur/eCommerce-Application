import * as React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/constants';

function SideBar({ selectedCategory, setSelectedCategory }): JSX.Element {
    console.log(selectedCategory);

    return (
        <aside className="sidebar">
            {categories.map((category) => (
                <div className="sidebar__item" key={category.name}>
                    <button className="btn" type="button">
                        <Link className="sidebar__title" to="/store">
                            {category.name}
                        </Link>
                    </button>

                    <div className="sidebar__btns">
                        {category.items.map((el) => (
                            <button
                                className="btn"
                                key={el}
                                type="button"
                                onClick={(): void => setSelectedCategory(el)}
                                data-category={{ selectedCategory }}
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
