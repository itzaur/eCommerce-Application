// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { Paper, IconButton } from '@mui/material';

function SearchBar(): JSX.Element {
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
            <input placeholder="Поиск..." value="" onChange={(): void => {}} />
            <IconButton type="submit" sx={{ p: '2rem', color: '#000000' }}>
                <Search />
            </IconButton>
        </Paper>
    );
}

export default SearchBar;
