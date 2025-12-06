import React, { useState, useContext } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
    Menu,
    MenuItem,
    Box,
    Avatar,
    Typography,
    alpha,
} from '@mui/material';
import {
    Search as SearchIcon,
    ShoppingCart as CartIcon,
    Person as PersonIcon,
    Brightness4 as DarkIcon,
    Brightness7 as LightIcon,
    Store as StoreIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchAnchorEl, setSearchAnchorEl] = useState(null);
    const navigate = useNavigate();

    const { darkMode, toggleDarkMode, language, changeLanguage, t } = useContext(ThemeContext);
    const { user, logout, searchHistory } = useContext(AuthContext);
    const { totalItems } = useContext(CartContext);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearchClick = (event) => {
        setSearchAnchorEl(event.currentTarget);
    };

    const handleSearchClose = () => {
        setSearchAnchorEl(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
            handleSearchClose();
        }
    };

    const handleHistoryClick = (query) => {
        setSearchQuery(query);
        navigate(`/catalog?search=${encodeURIComponent(query)}`);
        handleSearchClose();
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: darkMode ? 'rgb(84, 84, 84)' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#212121',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                }}
            >
                <Toolbar sx={{ gap: 2 }}>
                    <IconButton onClick={() => navigate('/')} sx={{ color: 'inherit' }}>
                        <StoreIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #4CAF50, #45B7D1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        InstantDelivery
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            position: 'relative',
                            borderRadius: 4,
                            backgroundColor: darkMode ? alpha('#fff', 0.1) : alpha('#000', 0.05),
                            '&:hover': {
                                backgroundColor: darkMode ? alpha('#fff', 0.15) : alpha('#000', 0.08),
                            },
                            width: 400,
                        }}
                    >
                        <IconButton
                            type="submit"
                            sx={{ p: '10px', color: 'inherit' }}
                            onClick={handleSearchClick}
                        >
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder={t.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                color: 'inherit',
                                width: '100%',
                                '& .MuiInputBase-input': {
                                    p: 1,
                                },
                            }}
                        />
                    </Box>

                    <IconButton
                        sx={{ display: { md: 'none' } }}
                        onClick={handleSearchClick}
                        color="inherit"
                    >
                        <SearchIcon />
                    </IconButton>

                    <IconButton onClick={() => navigate('/cart')} color="inherit">
                        <Badge badgeContent={totalItems} color="error">
                            <CartIcon />
                        </Badge>
                    </IconButton>

                    <IconButton onClick={toggleDarkMode} color="inherit">
                        {darkMode ? <LightIcon /> : <DarkIcon />}
                    </IconButton>

                    <IconButton onClick={handleProfileMenuOpen} color="inherit">
                        {user ? (
                            <Avatar sx={{ bgcolor: '#4CAF50', width: 32, height: 32 }}>
                                {user.name.charAt(0)}
                            </Avatar>
                        ) : (
                            <PersonIcon />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {user ? (
                    [
                        <MenuItem key="profile" onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                            Профиль
                        </MenuItem>,
                        <MenuItem key="orders" onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                            Мои заказы
                        </MenuItem>,
                        <MenuItem key="planning" onClick={() => { navigate('/order-planning'); handleMenuClose(); }}>
                            Планирование
                        </MenuItem>,
                        <MenuItem key="lang" onClick={() => { changeLanguage(language === 'ru' ? 'en' : 'ru'); handleMenuClose(); }}>
                            {language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
                        </MenuItem>,
                        <MenuItem key="logout" onClick={() => { logout(); handleMenuClose(); }}>
                            Выйти
                        </MenuItem>,
                    ]
                ) : (
                    [
                        <MenuItem key="login" onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                            Войти
                        </MenuItem>,
                        <MenuItem key="lang" onClick={() => { changeLanguage(language === 'ru' ? 'en' : 'ru'); handleMenuClose(); }}>
                            {language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
                        </MenuItem>,
                    ]
                )}
            </Menu>

            <Menu
                anchorEl={searchAnchorEl}
                open={Boolean(searchAnchorEl)}
                onClose={handleSearchClose}
                PaperProps={{
                    sx: { width: 400, maxWidth: '80vw' },
                }}
            >
                {searchHistory.length > 0 && (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            История поиска
                        </Typography>
                        {searchHistory.map((query, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleHistoryClick(query)}
                                sx={{ borderRadius: 1 }}
                            >
                                <SearchIcon sx={{ mr: 1, fontSize: 20, opacity: 0.5 }} />
                                {query}
                            </MenuItem>
                        ))}
                    </Box>
                )}
            </Menu>
        </>
    );
};

export default Header;