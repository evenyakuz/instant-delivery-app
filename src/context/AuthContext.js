import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const [searchHistory, setSearchHistory] = useState(() => {
        const saved = localStorage.getItem('searchHistory');
        return saved ? JSON.parse(saved) : [];
    });

    const [viewHistory, setViewHistory] = useState(() => {
        const saved = localStorage.getItem('viewHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    useEffect(() => {
        localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
    }, [viewHistory]);

    const login = (email, password) => {
        // В реальном приложении здесь был бы API запрос
        const userData = {
            id: '1',
            email,
            name: 'Иван Иванов',
            city: 'Москва',
            orders: [],
        };
        setUser(userData);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    const addToSearchHistory = (query) => {
        if (!query.trim()) return;
        setSearchHistory(prev => {
            const filtered = prev.filter(item => item !== query);
            return [query, ...filtered].slice(0, 10);
        });
    };

    const addToViewHistory = (product) => {
        setViewHistory(prev => {
            const filtered = prev.filter(item => item.id !== product.id);
            return [product, ...filtered].slice(0, 20);
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            searchHistory,
            addToSearchHistory,
            viewHistory,
            addToViewHistory,
        }}>
            {children}
        </AuthContext.Provider>
    );
};