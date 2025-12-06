export const CITIES = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Челябинск',
    'Самара',
    'Омск',
    'Ростов-на-Дону',
    'Уфа',
    'Красноярск',
    'Воронеж',
    'Пермь',
    'Волгоград',
];

export const CATEGORIES = [
    { id: 'food', name: 'Продукты', icon: '🍎' },
    { id: 'clothes', name: 'Одежда', icon: '👕' },
    { id: 'electronics', name: 'Техника', icon: '📱' },
    { id: 'flowers', name: 'Цветы', icon: '🌷' },
    { id: 'home', name: 'Для дома', icon: '🏠' },
    { id: 'office', name: 'Офис', icon: '📎' },
    { id: 'sports', name: 'Спорт', icon: '⚽' },
    { id: 'beauty', name: 'Красота', icon: '💄' },
    { id: 'pharmacy', name: 'Аптека', icon: '💊' },
    { id: 'books', name: 'Книги', icon: '📚' },
];

export const STORES = [
    { id: 1, name: 'Супермаркет "Продукты"', category: 'food', rating: 4.8 },
    { id: 2, name: 'Магазин одежды "Стиль"', category: 'clothes', rating: 4.6 },
    { id: 3, name: 'Технодом', category: 'electronics', rating: 4.9 },
    { id: 4, name: 'Цветочный рай', category: 'flowers', rating: 4.7 },
    { id: 5, name: 'Дом и уют', category: 'home', rating: 4.5 },
];

export const PAYMENT_METHODS = [
    { id: 'card', name: 'Банковская карта', icon: '💳' },
    { id: 'cash', name: 'Наличные', icon: '💰' },
    { id: 'apple_pay', name: 'Apple Pay', icon: '🍎' },
    { id: 'google_pay', name: 'Google Pay', icon: '📱' },
];

export const ORDER_STATUSES = {
    processing: 'В обработке',
    preparing: 'Готовится',
    delivering: 'Доставляется',
    delivered: 'Доставлен',
    cancelled: 'Отменен',
};