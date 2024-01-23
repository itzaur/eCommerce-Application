import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import { Paper, IconButton } from '@mui/material';
import { memoizedAttributesToSearch } from '../../redux/selectors/selectors';
import { setAttributesToSearch } from '../../redux/features/catalogSlice';

interface SearchBarProps {
    searchBarOpen: boolean;
}

function SearchBar(props: SearchBarProps): JSX.Element {
    const { searchBarOpen } = props;
    const searchValue = useSelector(memoizedAttributesToSearch);
    const dispatch = useDispatch();
    const [currentValue, setCurrentValue] = useState(searchValue);

    return (
        <Paper
            component="form"
            id="search-bar"
            className={
                searchBarOpen ? 'search-bar search-bar_open' : 'search-bar'
            }
            onSubmit={(): void => {}}
            sx={{
                boxShadow: 'none',
                backgroundColor: '#4fe1e3',
                pl: 2,

                mr: { sm: 5 },
            }}
        >
            <IconButton
                type="submit"
                onClick={(e): void => {
                    e.preventDefault();
                    dispatch(setAttributesToSearch(currentValue));
                }}
                sx={{ p: '2rem', color: '#000000' }}
            >
                <input
                    placeholder="Поиск..."
                    value={currentValue}
                    onChange={(e): void => {
                        setCurrentValue(e.target.value);
                    }}
                />

                <Search />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
