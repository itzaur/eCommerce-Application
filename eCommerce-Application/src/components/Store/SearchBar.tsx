import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { Paper, IconButton } from '@mui/material';

function SearchBar({
    setSearchValue,
    searchBarOpen,
}: {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    searchBarOpen: boolean;
}): JSX.Element {
    const [value, setValue] = useState('');

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
                    setSearchValue(value);
                }}
                sx={{ p: '2rem', color: '#000000' }}
            >
                <input
                    placeholder="Поиск..."
                    onChange={(e): void => {
                        setValue(e.target.value);
                    }}
                />

                <Search />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
