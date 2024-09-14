import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Pokédex
                </Typography>
                <IconButton component={Link} to="/favorites" color="inherit">
                    <Favorite />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
