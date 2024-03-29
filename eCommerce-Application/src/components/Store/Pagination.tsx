import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import arrowPrev from '../../assets/icons/arrow-prev.svg';
import arrowNext from '../../assets/icons/arrow-next.svg';
import { setCurrentOffset } from '../../redux/features/catalogSlice';

interface PaginaionProps {
    currentOffset: number;
    itemPerPage: number;
    countCards: number;
}

function Pagination(props: PaginaionProps): JSX.Element {
    const { itemPerPage, countCards, currentOffset } = props;
    const [countPages, setCountPages] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setCountPages(countCards ? Math.ceil(countCards / itemPerPage) : 0);
    }, [countCards, itemPerPage]);

    return (
        <div className="store__navigation">
            {currentOffset / itemPerPage + 1 !== countPages && (
                <button
                    type="button"
                    className="btn_action btn_store"
                    onClick={(): void | null => {
                        if (currentOffset < countCards - itemPerPage)
                            dispatch(
                                setCurrentOffset(currentOffset + itemPerPage)
                            );
                    }}
                >
                    Следующая страница
                </button>
            )}

            <div className="store__pages">
                <button
                    type="button"
                    className="store__page store__page-prev"
                    onClick={(): void => {
                        if (currentOffset >= itemPerPage)
                            dispatch(
                                setCurrentOffset(currentOffset - itemPerPage)
                            );
                    }}
                >
                    <img src={arrowPrev} alt="arrow" />
                </button>
                <div className="store__current-page">
                    {currentOffset / itemPerPage + 1}
                </div>
                <div className="store__count-page">{countPages}</div>
                <button
                    type="button"
                    className="store__page store__page-next"
                    onClick={(): void => {
                        if (currentOffset < countCards - itemPerPage)
                            dispatch(
                                setCurrentOffset(currentOffset + itemPerPage)
                            );
                    }}
                >
                    <img src={arrowNext} alt="arrow" />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
