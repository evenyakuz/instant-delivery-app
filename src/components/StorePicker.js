import React, { useState, useContext } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Avatar,
    Rating,
    Divider,
    Badge,
    Switch,
    FormControlLabel as MuiFormControlLabel,
    Alert,
} from '@mui/material';
import {
    Store as StoreIcon,
    Schedule as ScheduleIcon,
    LocalShipping as ShippingIcon,
    ShoppingBasket as BasketIcon,
    Group as GroupIcon,
    AccessTime as TimeIcon,
    Star as StarIcon,
    CheckCircle as CheckIcon,
    Info as InfoIcon,
    CalendarToday as CalendarIcon,
    Euro as EuroIcon,
    Timer as TimerIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { ThemeContext } from '../context/ThemeContext';

const StorePicker = ({ onStoreSelect, selectedStore }) => {
    const [stores, setStores] = useState([
        {
            id: 'store1',
            name: 'Продуктовый супермаркет',
            category: 'food',
            rating: 4.8,
            deliveryTime: '15-30 мин',
            minOrder: 500,
            deliveryFee: 99,
            isOpen: true,
            schedule: '08:00 - 23:00',
            distance: '0.8 км',
            productsAvailable: 1500,
            features: ['express', 'group', 'preorder'],
            icon: '🛒',
        },
        {
            id: 'store2',
            name: 'Технодом',
            category: 'electronics',
            rating: 4.9,
            deliveryTime: '30-45 мин',
            minOrder: 1000,
            deliveryFee: 149,
            isOpen: true,
            schedule: '10:00 - 22:00',
            distance: '1.2 км',
            productsAvailable: 800,
            features: ['rental', 'express', 'installation'],
            icon: '📱',
        },
        {
            id: 'store3',
            name: 'Цветочный рай',
            category: 'flowers',
            rating: 4.7,
            deliveryTime: '15-25 мин',
            minOrder: 300,
            deliveryFee: 79,
            isOpen: true,
            schedule: '09:00 - 21:00',
            distance: '0.5 км',
            productsAvailable: 300,
            features: ['express', 'custom'],
            icon: '🌷',
        },
        {
            id: 'store4',
            name: 'Одежда "Стиль"',
            category: 'clothes',
            rating: 4.6,
            deliveryTime: '25-40 мин',
            minOrder: 800,
            deliveryFee: 129,
            isOpen: true,
            schedule: '10:00 - 20:00',
            distance: '1.5 км',
            productsAvailable: 1200,
            features: ['rental', 'fitting'],
            icon: '👕',
        },
        {
            id: 'store5',
            name: 'Дом и уют',
            category: 'home',
            rating: 4.5,
            deliveryTime: '20-35 мин',
            minOrder: 700,
            deliveryFee: 119,
            isOpen: false,
            schedule: '09:00 - 20:00',
            distance: '2.0 км',
            productsAvailable: 900,
            features: ['assembly'],
            icon: '🏠',
        },
    ]);

    const [filter, setFilter] = useState('all');
    const [rentalDialog, setRentalDialog] = useState(false);
    const [groupOrderDialog, setGroupOrderDialog] = useState(false);
    const [preorderDialog, setPreorderDialog] = useState(false);
    const [selectedStoreForDialog, setSelectedStoreForDialog] = useState(null);

    const categories = [
        { id: 'all', name: 'Все магазины' },
        { id: 'food', name: 'Продукты' },
        { id: 'electronics', name: 'Техника' },
        { id: 'flowers', name: 'Цветы' },
        { id: 'clothes', name: 'Одежда' },
        { id: 'home', name: 'Для дома' },
    ];

    const handleStoreSelect = (store) => {
        onStoreSelect(store);
    };

    const handleRentalClick = (store) => {
        setSelectedStoreForDialog(store);
        setRentalDialog(true);
    };

    const handleGroupOrderClick = (store) => {
        setSelectedStoreForDialog(store);
        setGroupOrderDialog(true);
    };

    const handlePreorderClick = (store) => {
        setSelectedStoreForDialog(store);
        setPreorderDialog(true);
    };

    const filteredStores = filter === 'all'
        ? stores
        : stores.filter(store => store.category === filter);

    const getFeatureIcon = (feature) => {
        switch (feature) {
            case 'express': return <TimerIcon fontSize="small" />;
            case 'group': return <GroupIcon fontSize="small" />;
            case 'preorder': return <CalendarIcon fontSize="small" />;
            case 'rental': return <EuroIcon fontSize="small" />;
            case 'installation': return <InfoIcon fontSize="small" />;
            case 'custom': return <StarIcon fontSize="small" />;
            case 'fitting': return <InfoIcon fontSize="small" />;
            case 'assembly': return <InfoIcon fontSize="small" />;
            default: return <InfoIcon fontSize="small" />;
        }
    };

    const getFeatureLabel = (feature) => {
        switch (feature) {
            case 'express': return 'Экспресс 15 мин';
            case 'group': return 'Групповые заказы';
            case 'preorder': return 'Предзаказ';
            case 'rental': return 'Аренда';
            case 'installation': return 'Установка';
            case 'custom': return 'Индивидуальный';
            case 'fitting': return 'Примерка';
            case 'assembly': return 'Сборка';
            default: return feature;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StoreIcon sx={{ color: '#4CAF50' }} />
                    Выбор магазина
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Выберите магазин для заказа. Каждый магазин предлагает уникальные услуги.
                </Typography>

                {/* Фильтры категорий */}
                <Box sx={{ mb: 3, display: 'flex', gap: 1, overflowX: 'auto', py: 1 }}>
                    {categories.map((category) => (
                        <Chip
                            key={category.id}
                            label={category.name}
                            onClick={() => setFilter(category.id)}
                            sx={{
                                px: 2,
                                backgroundColor: filter === category.id ? '#4CAF50' : 'transparent',
                                color: filter === category.id ? 'white' : 'inherit',
                                border: filter === category.id ? 'none' : '1px solid',
                                borderColor: 'divider',
                                '&:hover': {
                                    backgroundColor: filter === category.id ? '#388E3C' : 'action.hover',
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Список магазинов */}
                <RadioGroup value={selectedStore?.id || ''}>
                    <Grid container spacing={2}>
                        {filteredStores.map((store) => (
                            <Grid item xs={12} key={store.id}>
                                <Card
                                    sx={{
                                        border: selectedStore?.id === store.id ? '2px solid #4CAF50' : '1px solid',
                                        borderColor: selectedStore?.id === store.id ? '#4CAF50' : 'divider',
                                        borderRadius: 2,
                                        transition: 'all 0.3s',
                                        opacity: store.isOpen ? 1 : 0.7,
                                        '&:hover': {
                                            borderColor: '#4CAF50',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={1}>
                                                <Avatar sx={{ bgcolor: '#E8F5E9', fontSize: 24 }}>
                                                    {store.icon}
                                                </Avatar>
                                            </Grid>

                                            <Grid item xs={8} sm={9}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <Typography variant="h6">
                                                        {store.name}
                                                    </Typography>
                                                    {!store.isOpen && (
                                                        <Chip label="Закрыто" size="small" color="error" />
                                                    )}
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Rating value={store.rating} size="small" readOnly />
                                                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                                                            {store.rating}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <ScheduleIcon fontSize="small" />
                                                        <Typography variant="body2">{store.schedule}</Typography>
                                                    </Box>

                                                    <Typography variant="body2" color="text.secondary">
                                                        {store.distance}
                                                    </Typography>
                                                </Box>

                                                {/* Особенности магазина */}
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                    {store.features.map((feature, index) => (
                                                        <Tooltip key={index} title={getFeatureLabel(feature)}>
                                                            <Chip
                                                                icon={getFeatureIcon(feature)}
                                                                label={getFeatureLabel(feature)}
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (feature === 'rental') handleRentalClick(store);
                                                                    if (feature === 'group') handleGroupOrderClick(store);
                                                                    if (feature === 'preorder') handlePreorderClick(store);
                                                                }}
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    '&:hover': { bgcolor: 'action.hover' },
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                </Box>
                                            </Grid>

                                            <Grid item xs={3} sm={2}>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="h6" color="primary">
                                                        {store.deliveryTime}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        доставка
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        от {store.minOrder} ₽
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        мин. заказ
                                                    </Typography>

                                                    <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={selectedStore?.id === store.id}
                                                                onChange={() => handleStoreSelect(store)}
                                                                disabled={!store.isOpen}
                                                            />
                                                        }
                                                        label=""
                                                        sx={{ mt: 1 }}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>

                {/* Диалог аренды */}
                <RentalDialog
                    open={rentalDialog}
                    onClose={() => setRentalDialog(false)}
                    store={selectedStoreForDialog}
                />

                {/* Диалог группового заказа */}
                <GroupOrderDialog
                    open={groupOrderDialog}
                    onClose={() => setGroupOrderDialog(false)}
                    store={selectedStoreForDialog}
                />

                {/* Диалог предзаказа */}
                <PreorderDialog
                    open={preorderDialog}
                    onClose={() => setPreorderDialog(false)}
                    store={selectedStoreForDialog}
                />
            </Box>
        </LocalizationProvider>
    );
};

const RentalDialog = ({ open, onClose, store }) => {
    const [rentalPeriod, setRentalPeriod] = useState('day');
    const [insurance, setInsurance] = useState(false);

    const rentalOptions = [
        { value: 'hour', label: 'Почасово', price: 500 },
        { value: 'day', label: 'На сутки', price: 1500 },
        { value: 'week', label: 'На неделю', price: 8000 },
        { value: 'month', label: 'На месяц', price: 25000 },
    ];

    const calculateTotal = () => {
        const option = rentalOptions.find(opt => opt.value === rentalPeriod);
        return option ? option.price + (insurance ? 500 : 0) : 0;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EuroIcon sx={{ color: '#4CAF50' }} />
                    Аренда товаров
                    <Chip label={store?.name} size="small" sx={{ ml: 2 }} />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" paragraph>
                    Арендуйте технику или одежду на нужный срок
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Срок аренды
                </Typography>
                <RadioGroup value={rentalPeriod} onChange={(e) => setRentalPeriod(e.target.value)}>
                    <Grid container spacing={1}>
                        {rentalOptions.map((option) => (
                            <Grid item xs={6} key={option.value}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        border: rentalPeriod === option.value ? '2px solid #4CAF50' : '1px solid',
                                        borderColor: rentalPeriod === option.value ? '#4CAF50' : 'divider',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setRentalPeriod(option.value)}
                                >
                                    <Typography variant="subtitle2">{option.label}</Typography>
                                    <Typography variant="h6" color="primary">
                                        {option.price} ₽
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>

                <Box sx={{ mt: 3 }}>
                    <MuiFormControlLabel
                        control={
                            <Switch
                                checked={insurance}
                                onChange={(e) => setInsurance(e.target.checked)}
                                color="primary"
                            />
                        }
                        label={
                            <Box>
                                <Typography>Страховка от повреждений</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    +500 ₽ (полное покрытие ущерба)
                                </Typography>
                            </Box>
                        }
                    />
                </Box>

                <Card sx={{ mt: 3, p: 2, bgcolor: '#E8F5E9' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Итого к оплате:</Typography>
                        <Typography variant="h4" color="primary" fontWeight="bold">
                            {calculateTotal().toLocaleString()} ₽
                        </Typography>
                    </Box>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant="contained" onClick={onClose}>
                    Оформить аренду
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const GroupOrderDialog = ({ open, onClose, store }) => {
    const [friends, setFriends] = useState(['', '']);
    const [splitMethod, setSplitMethod] = useState('equal');

    const handleAddFriend = () => {
        setFriends([...friends, '']);
    };

    const handleFriendChange = (index, value) => {
        const newFriends = [...friends];
        newFriends[index] = value;
        setFriends(newFriends);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupIcon sx={{ color: '#4CAF50' }} />
                    Групповой заказ
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" paragraph>
                    Совместный заказ с друзьями из {store?.name}. Каждый оплачивает свою часть.
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Участники заказа
                </Typography>
                {friends.map((friend, index) => (
                    <TextField
                        key={index}
                        fullWidth
                        label={`Друг ${index + 1}`}
                        value={friend}
                        onChange={(e) => handleFriendChange(index, e.target.value)}
                        placeholder="Email или телефон"
                        sx={{ mb: 2 }}
                    />
                ))}
                <Button startIcon={<GroupIcon />} onClick={handleAddFriend}>
                    Добавить участника
                </Button>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                    Разделение счета
                </Typography>
                <RadioGroup value={splitMethod} onChange={(e) => setSplitMethod(e.target.value)}>
                    <FormControlLabel value="equal" control={<Radio />} label="Поровну на всех" />
                    <FormControlLabel value="separate" control={<Radio />} label="Каждый за свой заказ" />
                    <FormControlLabel value="custom" control={<Radio />} label="Произвольные доли" />
                </RadioGroup>

                <Alert severity="info" sx={{ mt: 2 }}>
                    Каждый участник получит уведомление и сможет добавить свои товары в общий заказ
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant="contained" onClick={onClose}>
                    Создать групповой заказ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const PreorderDialog = ({ open, onClose, store }) => {
    const [preorderDate, setPreorderDate] = useState(new Date());
    const [preorderTime, setPreorderTime] = useState(new Date());

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon sx={{ color: '#4CAF50' }} />
                    Предзаказ товаров
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" paragraph>
                    Забронируйте товары из {store?.name} на будущую дату
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <DatePicker
                            label="Дата получения"
                            value={preorderDate}
                            onChange={(newValue) => setPreorderDate(newValue)}
                            minDate={new Date()}
                            slots={{
                                textField: (params) => <TextField {...params} fullWidth />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TimePicker
                            label="Время получения"
                            value={preorderTime}
                            onChange={(newValue) => setPreorderTime(newValue)}
                            slots={{
                                textField: (params) => <TextField {...params} fullWidth />,
                            }}
                        />
                    </Grid>
                </Grid>

                <Alert severity="success" sx={{ mt: 2 }}>
                    ✅ Предоплата не требуется<br />
                    ✅ Можно отменить за 2 часа до доставки<br />
                    ✅ Приоритетная сборка заказа
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button variant="contained" onClick={onClose}>
                    Оформить предзаказ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StorePicker;