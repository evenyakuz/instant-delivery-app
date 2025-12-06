import React, { useState, useContext } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Chip,
    Alert,
} from '@mui/material';
import {
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,
    CheckCircle as CheckIcon,
    LocationOn as LocationIcon,
    Schedule as ScheduleIcon,
    CreditCard as CreditCardIcon,
    Wallet as WalletIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { CartContext } from '../context/CartContext';
import { deliverySpeeds } from '../styles/theme';

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [deliveryTime, setDeliveryTime] = useState(new Date());
    const [address, setAddress] = useState({
        street: '',
        building: '',
        apartment: '',
        entrance: '',
        floor: '',
        comment: '',
    });
    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const navigate = useNavigate();
    const { cart, subtotal, selectedDelivery, clearCart } = useContext(CartContext);

    const deliveryFee = deliverySpeeds.find(s => s.id === selectedDelivery)?.price || 99;
    const total = subtotal + deliveryFee;

    const steps = ['Адрес доставки', 'Время доставки', 'Оплата', 'Подтверждение'];

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // Оформление заказа
            handlePlaceOrder();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handlePlaceOrder = () => {
        // В реальном приложении здесь был бы API запрос
        console.log('Заказ оформлен:', {
            address,
            contactInfo,
            paymentMethod,
            deliveryDate,
            deliveryTime,
            cart,
            total,
        });

        // Очищаем корзину
        clearCart();

        // Показываем подтверждение
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    const handleInputChange = (setter) => (e) => {
        setter(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Адрес доставки
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    label="Улица"
                                    name="street"
                                    value={address.street}
                                    onChange={handleInputChange(setAddress)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Дом"
                                    name="building"
                                    value={address.building}
                                    onChange={handleInputChange(setAddress)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Квартира"
                                    name="apartment"
                                    value={address.apartment}
                                    onChange={handleInputChange(setAddress)}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Подъезд"
                                    name="entrance"
                                    value={address.entrance}
                                    onChange={handleInputChange(setAddress)}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Этаж"
                                    name="floor"
                                    value={address.floor}
                                    onChange={handleInputChange(setAddress)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Комментарий для курьера"
                                    name="comment"
                                    value={address.comment}
                                    onChange={handleInputChange(setAddress)}
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            Контактная информация
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Имя"
                                    name="name"
                                    value={contactInfo.name}
                                    onChange={handleInputChange(setContactInfo)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Телефон"
                                    name="phone"
                                    value={contactInfo.phone}
                                    onChange={handleInputChange(setContactInfo)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={contactInfo.email}
                                    onChange={handleInputChange(setContactInfo)}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );

            case 1:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Выберите время доставки
                        </Typography>

                        <Card variant="outlined" sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ShippingIcon sx={{ mr: 2, color: '#4CAF50' }} />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {deliverySpeeds.find(s => s.id === selectedDelivery)?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {deliverySpeeds.find(s => s.id === selectedDelivery)?.description}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={`${deliveryFee} ₽`}
                                    sx={{ ml: 'auto', bgcolor: '#E8F5E9', color: '#2E7D32' }}
                                />
                            </Box>
                        </Card>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <DatePicker
                                        label="Дата доставки"
                                        value={deliveryDate}
                                        onChange={(newValue) => setDeliveryDate(newValue)}
                                        minDate={new Date()}
                                        slots={{
                                            textField: (params) => <TextField {...params} fullWidth />,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <TimePicker
                                        label="Время доставки"
                                        value={deliveryTime}
                                        onChange={(newValue) => setDeliveryTime(newValue)}
                                        slots={{
                                            textField: (params) => <TextField {...params} fullWidth />,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Alert severity="info" sx={{ mt: 2 }}>
                            Курьер позвонит вам за 15 минут до доставки
                        </Alert>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Способ оплаты
                        </Typography>

                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        border: paymentMethod === 'card' ? '2px solid #4CAF50' : '1px solid',
                                        borderColor: paymentMethod === 'card' ? '#4CAF50' : 'divider',
                                    }}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <FormControlLabel
                                        value="card"
                                        control={<Radio />}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <CreditCardIcon sx={{ mr: 2 }} />
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography>Банковская карта</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Оплата онлайн
                                                    </Typography>
                                                </Box>
                                                <Chip label="Рекомендуется" size="small" color="primary" />
                                            </Box>
                                        }
                                        sx={{ width: '100%', m: 0 }}
                                    />
                                </Card>

                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        border: paymentMethod === 'cash' ? '2px solid #4CAF50' : '1px solid',
                                        borderColor: paymentMethod === 'cash' ? '#4CAF50' : 'divider',
                                    }}
                                    onClick={() => setPaymentMethod('cash')}
                                >
                                    <FormControlLabel
                                        value="cash"
                                        control={<Radio />}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <WalletIcon sx={{ mr: 2 }} />
                                                <Box>
                                                    <Typography>Наличными курьеру</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Оплата при получении
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        sx={{ width: '100%', m: 0 }}
                                    />
                                </Card>
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'card' && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Данные карты
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Номер карты"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Срок действия"
                                            placeholder="MM/YY"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="CVV"
                                            placeholder="123"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        <Alert severity="success" sx={{ mt: 3 }}>
                            Ваши данные защищены по стандарту PCI DSS
                        </Alert>
                    </Box>
                );

            case 3:
                return (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <CheckIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Подтверждение заказа
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Пожалуйста, проверьте информацию о заказе
                        </Typography>

                        <Paper sx={{ p: 3, mt: 3, textAlign: 'left' }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Адрес доставки
                                </Typography>
                                <Typography>
                                    {address.street}, д. {address.building}
                                    {address.apartment && `, кв. ${address.apartment}`}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Время доставки
                                </Typography>
                                <Typography>
                                    {deliveryDate.toLocaleDateString('ru-RU')} в {deliveryTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Способ оплаты
                                </Typography>
                                <Typography>
                                    {paymentMethod === 'card' ? 'Банковская карта' : 'Наличные курьеру'}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Сумма заказа
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {total.toLocaleString()} ₽
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Оформление заказа
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ borderRadius: 3, mb: 3 }}>
                            <CardContent>
                                {renderStepContent(activeStep)}
                            </CardContent>
                        </Card>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{ color: '#4CAF50' }}
                            >
                                Назад
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    '&:hover': { backgroundColor: '#388E3C' },
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'Оформить заказ' : 'Далее'}
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ position: 'sticky', top: 100, borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Ваш заказ
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    {cart.slice(0, 3).map((item) => (
                                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">
                                                {item.name} × {item.quantity}
                                            </Typography>
                                            <Typography variant="body2">
                                                {(item.price * item.quantity).toLocaleString()} ₽
                                            </Typography>
                                        </Box>
                                    ))}
                                    {cart.length > 3 && (
                                        <Typography variant="body2" color="text.secondary">
                                            и ещё {cart.length - 3} товаров...
                                        </Typography>
                                    )}
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography color="text.secondary">Товары</Typography>
                                        <Typography>{subtotal.toLocaleString()} ₽</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography color="text.secondary">Доставка</Typography>
                                        <Typography>{deliveryFee.toLocaleString()} ₽</Typography>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6">Итого</Typography>
                                        <Typography variant="h5" color="primary" fontWeight="bold">
                                            {total.toLocaleString()} ₽
                                        </Typography>
                                    </Box>
                                </Box>

                                <Alert severity="info" sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        Фиксированная стоимость доставки
                                    </Typography>
                                </Alert>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default Checkout;