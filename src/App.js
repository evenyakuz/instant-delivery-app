import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import OrderPlanning from './pages/OrderPlanning';
import Checkout from './pages/Checkout';
import { ThemeContext } from './context/ThemeContext';
import { themeConfig } from './styles/theme';

function App() {
    const { darkMode, language } = useContext(ThemeContext);

    const theme = createTheme({
        ...themeConfig,
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: themeConfig.colors.primary,
            },
            background: {
                default: darkMode ? themeConfig.colors.darkBackground : '#ffffff',
                paper: darkMode ? themeConfig.colors.darkBackground : '#ffffff',
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/order-planning" element={<OrderPlanning />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;