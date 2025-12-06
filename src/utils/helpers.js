export const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    }).format(price);
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const calculateDeliveryTime = (speed, baseTime = 15) => {
    const times = {
        instant: baseTime,
        fast: baseTime * 2,
        standard: baseTime * 4,
        scheduled: baseTime * 3,
    };
    return times[speed] || baseTime * 4;
};

export const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePhone = (phone) => {
    const re = /^[\+]?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    return re.test(phone);
};

export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};