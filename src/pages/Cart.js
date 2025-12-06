import React, { useContext, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    IconButton,
    TextField,
    Divider,
    Chip,
    Paper,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as CartIcon,
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { deliverySpeeds } from '../styles/theme';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, subtotal, selectedDelivery, setSelectedDelivery } = useContext(CartContext);
    const { darkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const deliveryFee = deliverySpeeds.find(s => s.id === selectedDelivery)?.price || 99;
    const total = subtotal + deliveryFee;

    const handleQuantityChange = (productId, change) => {
        const product = cart.find(item => item.id === productId);
        if (product) {
            updateQuantity(productId, product.quantity + change);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <Box sx={{ fontSize: 100, color: '#e0e0e0', mb: 2 }}>
                        <CartIcon sx={{ fontSize: 'inherit' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Корзина пуста
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Добавьте товары из каталога, чтобы оформить заказ
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{
                            backgroundColor: '#4CAF50',
                            px: 6,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#388E3C',
                            },
                        }}
                    >
                        Перейти к покупкам
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Корзина
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                <Step>
                    <StepLabel>Корзина</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Оформление</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Подтверждение</StepLabel>
                </Step>
            </Stepper>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Card sx={{ borderRadius: 3, mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Товары в корзине ({cart.length})
                            </Typography>
                            {cart.map((item) => (
                                <Box key={item.id} sx={{ mb: 3 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={3} sm={2}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 80,
                                                    borderRadius: 2,
                                                    backgroundImage: `url(${item.image || 'https://picsum.photos/100/80?random=' + item.id})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={9} sm={6}>
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.store || 'Магазин'}
                                            </Typography>
                                            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                                {item.price.toLocaleString()} ₽
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={2}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={2}>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Typography variant="h6" sx={{ mr: 1 }}>
                                                    {(item.price * item.quantity).toLocaleString()} ₽
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeFromCart(item.id)}
                                                    sx={{ color: '#f44336' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ mt: 2 }} />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Скорость доставки
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Выберите подходящий вариант доставки. Мы не накручиваем цены на товары!
                            </Typography>
                            <Grid container spacing={2}>
                                {deliverySpeeds.map((speed) => (
                                    <Grid item xs={12} sm={6} key={speed.id}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                border: selectedDelivery === speed.id ? `2px solid ${speed.color}` : '1px solid',
                                                borderColor: selectedDelivery === speed.id ? speed.color : 'divider',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                '&:hover': {
                                                    borderColor: speed.color,
                                                    transform: 'translateY(-2px)',
                                                },
                                            }}
                                            onClick={() => setSelectedDelivery(speed.id)}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        {speed.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {speed.description}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="h6" color="primary">
                                                    {speed.price} ₽
                                                </Typography>
                                            </Box>
                                            {selectedDelivery === speed.id && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <CheckIcon sx={{ fontSize: 16, mr: 0.5, color: speed.color }} />
                                                    <Typography variant="caption" color={speed.color}>
                                                        Выбрано
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card sx={{ position: 'sticky', top: 100, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Итого
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography color="text.secondary">Товары ({cart.length})</Typography>
                                    <Typography>{subtotal.toLocaleString()} ₽</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography color="text.secondary">Доставка</Typography>
                                    <Typography>{deliveryFee.toLocaleString()} ₽</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">Общая сумма</Typography>
                                    <Typography variant="h5" color="primary" fontWeight="bold">
                                        {total.toLocaleString()} ₽
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Промокод
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        size="small"
                                        placeholder="Введите промокод"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        sx={{ flex: 1 }}
                                    />
                                    <Button variant="outlined" sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}>
                                        Применить
                                    </Button>
                                </Box>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleCheckout}
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    py: 1.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#388E3C',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                Перейти к оформлению
                            </Button>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    💡 Преимущества нашего сервиса:
                                </Typography>
                                <ul style={{ paddingLeft: 20, margin: 0 }}>
                                    <li>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Без наценок</strong> на товары
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Фиксированная стоимость</strong> доставки
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body2" color="text.secondary">
                                            Гарантия возврата 14 дней
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant="body2" color="text.secondary">
                                            Приоритетная поддержка
                                        </Typography>
                                    </li>
                                </ul>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: 3, borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <ShippingIcon sx={{ mr: 1, color: '#4CAF50' }} />
                                Быстрая доставка
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Закажите сейчас - получите через {deliverySpeeds.find(s => s.id === selectedDelivery)?.description}
                            </Typography>
                            <Chip
                                label="Экономия до 40%"
                                size="small"
                                sx={{ mt: 1, bgcolor: '#E8F5E9', color: '#2E7D32' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;