export const themeConfig = {
    colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        darkBackground: 'rgb(84, 84, 84)',
        lightBackground: '#ffffff',
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
    },
    shadows: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
        elevated: '0 8px 40px rgba(0,0,0,0.12)',
    },
    transitions: {
        smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
};

export const deliverySpeeds = [
    {
        id: 'instant',
        name: 'Мгновенная',
        description: '15-30 минут',
        price: 299,
        color: '#FF6B6B'
    },
    {
        id: 'fast',
        name: 'Быстрая',
        description: '1-2 часа',
        price: 199,
        color: '#4ECDC4'
    },
    {
        id: 'standard',
        name: 'Стандартная',
        description: '3-5 часов',
        price: 99,
        color: '#45B7D1'
    },
    {
        id: 'scheduled',
        name: 'По расписанию',
        description: 'Выберите время',
        price: 149,
        color: '#96CEB4'
    },
];