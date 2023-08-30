// import { useState } from 'react';
import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { Paper, IconButton } from '@mui/material';

function SearchBar({
    setSearchValue,
}: Record<
    'setSearchValue',
    React.Dispatch<React.SetStateAction<string>>
>): JSX.Element {
    const [value, setValue] = useState('');
    return (
        <Paper
            component="form"
            className="search-bar"
            onSubmit={(): void => {}}
            sx={{
                boxShadow: 'none',
                backgroundColor: '#4fe1e3',
                pl: 2,

                mr: { sm: 5 },
            }}
        >
            <input
                placeholder="Поиск..."
                onChange={(e): void => {
                    setValue(e.target.value);
                }}
            />
            <IconButton
                type="submit"
                onClick={(e): void => {
                    e.preventDefault();
                    setSearchValue(value);
                }}
                sx={{ p: '2rem', color: '#000000' }}
            >
                <Search />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
