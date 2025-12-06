import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Box,
    CircularProgress,
    IconButton,
    Fab,
    Tabs,
    Tab,
    Paper,
} from '@mui/material';
import {
    AddShoppingCart as AddCartIcon,
    FavoriteBorder as FavoriteIcon,
    Bolt as BoltIcon,
    LocalShipping as ShippingIcon,
    Store as StoreIcon,
    Timer as TimerIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CategoryFilter from '../components/CategoryFilter';
import DeliverySpeed from '../components/DeliverySpeed';
import StorePicker from '../components/StorePicker';
import ExpressDelivery from '../components/ExpressDelivery';
import MultiStoreOrder from '../components/MultiStoreOrder';

const categories = [
    { id: 'all', name: 'Все товары', icon: '🛍️' },
    { id: 'food', name: 'Продукты', icon: '🍎' },
    { id: 'clothes', name: 'Одежда', icon: '👕' },
    { id: 'flowers', name: 'Цветы', icon: '🌷' },
    { id: 'electronics', name: 'Техника', icon: '📱' },
    { id: 'home', name: 'Для дома', icon: '🏠' },
];

const mockProducts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Товар ${i + 1}`,
    description: 'Высококачественный товар с быстрой доставкой',
    price: Math.floor(Math.random() * 10000) + 100,
    category: categories[Math.floor(Math.random() * categories.length)].id,
    image: `https://picsum.photos/300/200?random=${i + 1}`,
    store: `Магазин ${Math.floor(i / 10) + 1}`,
    deliveryTime: `${Math.floor(Math.random() * 30) + 15} мин`,
    rating: (Math.random() * 2 + 3).toFixed(1),
}));

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStore, setSelectedStore] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const { darkMode } = useContext(ThemeContext);
    const { addToCart } = useContext(CartContext);
    const { addToViewHistory } = useContext(AuthContext);

    const loadMoreProducts = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const newProducts = mockProducts.slice((page - 1) * 10, page * 10);
            setProducts(prev => [...prev, ...newProducts]);
            setLoading(false);
        }, 500);
    }, [page]);

    useEffect(() => {
        loadMoreProducts();
    }, [loadMoreProducts]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                !loading &&
                products.length < mockProducts.length
            ) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, products.length]);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleProductClick = (product) => {
        addToViewHistory(product);
    };

    const handleExpressDeliveryConfirm = () => {
        alert('Экспресс-доставка активирована! Курьер отправится к вам в течение 2 минут.');
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 0: // Основной каталог
                return (
                    <>
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />

                        <Box sx={{ mt: 4 }}>
                            <Grid container spacing={3}>
                                {filteredProducts.map((product) => (
                                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ position: 'relative' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={product.image}
                                                    alt={product.name}
                                                    onClick={() => handleProductClick(product)}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                                <Chip
                                                    label={product.deliveryTime}
                                                    size="small"
                                                    icon={<BoltIcon />}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 12,
                                                        left: 12,
                                                        backgroundColor: '#4CAF50',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                                <IconButton
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 12,
                                                        right: 12,
                                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                                        '&:hover': { backgroundColor: 'white' },
                                                    }}
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                            </Box>

                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                                    {product.store}
                                                </Typography>
                                                <Typography variant="h6" component="div" gutterBottom>
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {product.description}
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Chip
                                                        label={`★ ${product.rating}`}
                                                        size="small"
                                                        sx={{ mr: 1 }}
                                                    />
                                                    <Typography variant="body2" color="text.secondary">
                                                        • Бесплатный возврат
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="h5" color="primary" fontWeight="bold">
                                                        {product.price.toLocaleString()} ₽
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<AddCartIcon />}
                                                        onClick={() => handleAddToCart(product)}
                                                        sx={{
                                                            borderRadius: 2,
                                                            backgroundColor: '#4CAF50',
                                                            '&:hover': {
                                                                backgroundColor: '#388E3C',
                                                                transform: 'scale(1.05)',
                                                            },
                                                        }}
                                                    >
                                                        В корзину
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress sx={{ color: '#4CAF50' }} />
                            </Box>
                        )}
                    </>
                );

            case 1: // Выбор магазина и экспресс-доставка
                return (
                    <>
                        <StorePicker
                            onStoreSelect={setSelectedStore}
                            selectedStore={selectedStore}
                        />

                        {selectedStore && selectedStore.features && selectedStore.features.includes('express') && (
                            <ExpressDelivery
                                store={selectedStore}
                                onConfirm={handleExpressDeliveryConfirm}
                            />
                        )}

                        <MultiStoreOrder />

                        <Box sx={{ mt: 4, p: 3, bgcolor: '#F5F5F5', borderRadius: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                💡 Как работает выбор магазина:
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                                        <StoreIcon sx={{ fontSize: 40, color: '#4CAF50', mb: 1 }} />
                                        <Typography variant="subtitle1" gutterBottom>
                                            Выбор магазина
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Выберите магазин с нужными товарами и услугами
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                                        <TimerIcon sx={{ fontSize: 40, color: '#FF6B6B', mb: 1 }} />
                                        <Typography variant="subtitle1" gutterBottom>
                                            Экспресс-доставка
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Закажите доставку за 15 минут с гарантией
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                                        <ShippingIcon sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
                                        <Typography variant="subtitle1" gutterBottom>
                                            Несколько магазинов
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Заказывайте из разных магазинов в одной доставке
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                    Моментальная доставка всего
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    От цветов до техники и одежды • Без наценок на товары • Фиксированная стоимость доставки
                </Typography>
            </Box>

            <DeliverySpeed />

            {/* Табы для переключения между режимами */}
            <Paper sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    centered
                    sx={{
                        '& .MuiTab-root': {
                            fontSize: '1rem',
                            fontWeight: 600,
                            py: 2,
                        },
                    }}
                >
                    <Tab
                        label="Каталог товаров"
                        icon={<StoreIcon />}
                        iconPosition="start"
                    />
                    <Tab
                        label="Выбор магазина и услуги"
                        icon={<ShippingIcon />}
                        iconPosition="start"
                    />
                </Tabs>
            </Paper>

            {renderMainContent()}

            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#388E3C',
                        transform: 'scale(1.1)',
                    },
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ShippingIcon />
            </Fab>
        </Container>
    );
};

export default Home;