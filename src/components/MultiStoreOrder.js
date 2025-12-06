import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider,
    Badge,
    Tooltip,
} from '@mui/material';
import {
    Store as StoreIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingCart as CartIcon,
    LocalShipping as ShippingIcon,
} from '@mui/icons-material';

const MultiStoreOrder = () => {
    const [stores, setStores] = useState([
        {
            id: 'store1',
            name: 'Продуктовый супермаркет',
            items: [
                { id: 'item1', name: 'Молоко', price: 80, quantity: 1 },
                { id: 'item2', name: 'Хлеб', price: 50, quantity: 2 },
            ],
            deliveryFee: 99,
        },
        {
            id: 'store2',
            name: 'Технодом',
            items: [
                { id: 'item3', name: 'Наушники', price: 2500, quantity: 1 },
            ],
            deliveryFee: 149,
        },
    ]);

    const handleQuantityChange = (storeId, itemId, delta) => {
        setStores(stores.map(store => {
            if (store.id === storeId) {
                return {
                    ...store,
                    items: store.items.map(item => {
                        if (item.id === itemId) {
                            const newQuantity = item.quantity + delta;
                            if (newQuantity <= 0) return null;
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    }).filter(Boolean),
                };
            }
            return store;
        }));
    };

    const handleRemoveStore = (storeId) => {
        setStores(stores.filter(store => store.id !== storeId));
    };

    const calculateStoreTotal = (store) => {
        const itemsTotal = store.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return itemsTotal + store.deliveryFee;
    };

    const calculateOverallTotal = () => {
        return stores.reduce((sum, store) => sum + calculateStoreTotal(store), 0);
    };

    const getDeliveryType = (storeId) => {
        // Логика определения типа доставки
        return stores.length > 1 ? 'Совмещенная' : 'Отдельная';
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <StoreIcon sx={{ color: '#4CAF50' }} />
                    <Typography variant="h5">
                        Заказ из нескольких магазинов
                    </Typography>
                    <Badge badgeContent={stores.length} color="primary" sx={{ ml: 2 }}>
                        <CartIcon />
                    </Badge>
                </Box>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Закажите товары из разных магазинов в одной корзине. Мы оптимизируем маршрут доставки!
                </Typography>

                {stores.map((store, storeIndex) => (
                    <Box key={store.id} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StoreIcon fontSize="small" />
                                <Typography variant="h6">{store.name}</Typography>
                                <Chip
                                    label={getDeliveryType(store.id)}
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Доставка: {store.deliveryFee} ₽
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveStore(store.id)}
                                    sx={{ color: '#f44336' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <List>
                            {store.items.map((item) => (
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(store.id, item.id, -1)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleQuantityChange(store.id, item.id, 1)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#E8F5E9' }}>
                                            <CartIcon sx={{ color: '#4CAF50' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`${item.price} ₽ × ${item.quantity} = ${item.price * item.quantity} ₽`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                            <Typography variant="subtitle1">
                                Итого по магазину: {calculateStoreTotal(store).toLocaleString()} ₽
                            </Typography>
                        </Box>

                        {storeIndex < stores.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                ))}

                <Box sx={{ mt: 3, p: 2, bgcolor: '#E3F2FD', borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Преимущества совмещенной доставки:
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                <li>Один курьер доставит все заказы</li>
                                <li>Экономия на доставке до 30%</li>
                                <li>Оптимальный маршрут доставки</li>
                                <li>Единое время получения</li>
                            </ul>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h6" color="text.secondary">
                                    Общая сумма заказа:
                                </Typography>
                                <Typography variant="h3" color="primary" fontWeight="bold">
                                    {calculateOverallTotal().toLocaleString()} ₽
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    из {stores.length} магазинов • {stores.reduce((sum, store) => sum + store.items.length, 0)} товаров
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                    >
                        Добавить еще магазин
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<ShippingIcon />}
                        sx={{ ml: 'auto', bgcolor: '#4CAF50' }}
                    >
                        Оформить совмещенную доставку
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MultiStoreOrder;