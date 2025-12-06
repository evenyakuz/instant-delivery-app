import React, { createContext, useState, useEffect } from 'react';
import { themeConfig } from '../styles/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'ru';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const translations = {
        ru: {
            welcome: 'Добро пожаловать',
            search: 'Поиск товаров...',
            cart: 'Корзина',
            profile: 'Профиль',
            categories: 'Категории',
        },
        en: {
            welcome: 'Welcome',
            search: 'Search products...',
            cart: 'Cart',
            profile: 'Profile',
            categories: 'Categories',
        },
    };

    return (
        <ThemeContext.Provider value={{
            darkMode,
            toggleDarkMode,
            language,
            changeLanguage,
            t: translations[language]
        }}>
            {children}
        </ThemeContext.Provider>
    );
};