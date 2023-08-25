import { categories } from '../../utils/constants';

function Parameters(props: {
    selectedType: string;
    // selectedCategory: string;
    // setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    // setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
    const {
        selectedType,
        // selectedCategory,
        // setSelectedType,
        // setSelectedCategory,
    } = props;

    const categoriesAmount = categories.map((el) => {
        if (el.name === selectedType && el.items.length) return el.items.length;
        return '';
    });
    const categoriesList = categories.find((el) => {
        if (el.name === selectedType && el.items.length) return el;
        return [];
    })?.items;
    return (
        <div className="parameters">
            <div className="parameters__left-side">
                <div className="parameters__item">
                    <button className="btn parameters__btn" type="button">
                        <span className="parameters__btn__img">
                            {' '}
                            &#8595;&#8593;
                        </span>
                        По умолчанию
                    </button>
                    <ul className="parameters__dropdown">
                        <li>
                            <span>&#8593;</span> По умолчанию
                        </li>
                        <li>
                            <span>&#8595;</span> A - Я
                        </li>
                        <li>
                            <span>&#8593;</span> Я - А
                        </li>
                        <li>
                            <span>&#8593;</span> По возрастанию цены
                        </li>
                        <li>
                            <span>&#8595;</span> По убыванию цены
                        </li>
                    </ul>
                </div>
                <div className="parameters__item">
                    <button className="btn parameters__btn" type="button">
                        Категория{' '}
                        <span className="parameters__btn__illustration">
                            {categoriesAmount}
                        </span>
                    </button>
                    <ul className="parameters__dropdown">
                        {categoriesList?.map((el, index) => (
                            <li key={index}>{el}</li>
                        ))}
                    </ul>
                </div>

                <button className="btn parameters__btn" type="button">
                    Цена{' '}
                    <span className="parameters__btn__illustration">$</span>
                </button>
                <button className="btn parameters__btn" type="button">
                    Акции
                </button>
            </div>

            <button className="btn parameters__btn" type="button">
                Очистить фильтры
            </button>
        </div>
    );
}

export default Parameters;
