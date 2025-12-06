import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Box,
    Chip,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    CalendarToday as CalendarIcon,
    Repeat as RepeatIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

const presets = [
    {
        id: 1,
        name: 'Продукты на неделю',
        description: 'Еженедельный набор продуктов',
        items: ['Молоко', 'Хлеб', 'Яйца', 'Фрукты', 'Овощи'],
        frequency: 'weekly',
        price: 2500,
        category: 'food',
    },
    {
        id: 2,
        name: 'Офисные расходники',
        description: 'Ежемесячные поставки для офиса',
        items: ['Бумага А4', 'Ручки', 'Степлеры', 'Папки', 'Скотч'],
        frequency: 'monthly',
        price: 5000,
        category: 'office',
    },
    {
        id: 3,
        name: 'Гигиена и уход',
        description: 'Товары для дома',
        items: ['Шампунь', 'Мыло', 'Зубная паста', 'Салфетки', 'Моющее средство'],
        frequency: 'monthly',
        price: 3000,
        category: 'home',
    },
];

const OrderPlanning = () => {
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [customItems, setCustomItems] = useState(['']);
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [frequency, setFrequency] = useState('weekly');

    const handleAddItem = () => {
        setCustomItems([...customItems, '']);
    };

    const handleItemChange = (index, value) => {
        const newItems = [...customItems];
        newItems[index] = value;
        setCustomItems(newItems);
    };

    const handleRemoveItem = (index) => {
        setCustomItems(customItems.filter((_, i) => i !== index));
    };

    const handleCreatePreset = () => {
        // Здесь будет логика создания пресета
        alert('Пресет создан!');
        setCustomItems(['']);
        setSelectedPreset(null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    🗓️ Планирование заказов
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Создайте повторяющиеся заказы для регулярных покупок
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                            Готовые пресеты
                        </Typography>
                        <Grid container spacing={2}>
                            {presets.map((preset) => (
                                <Grid item xs={12} sm={6} key={preset.id}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            border: selectedPreset?.id === preset.id ? '2px solid #4CAF50' : '1px solid',
                                            borderColor: 'divider',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                borderColor: '#4CAF50',
                                                transform: 'translateY(-4px)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="h6">{preset.name}</Typography>
                                                <Chip
                                                    label={preset.frequency === 'weekly' ? 'Еженедельно' : 'Ежемесячно'}
                                                    size="small"
                                                    icon={<RepeatIcon />}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {preset.description}
                                            </Typography>
                                            <Box sx={{ mb: 2 }}>
                                                {preset.items.map((item, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={item}
                                                        size="small"
                                                        sx={{ mr: 0.5, mb: 0.5 }}
                                                    />
                                                ))}
                                            </Box>
                                            <Typography variant="h6" color="primary">
                                                {preset.price.toLocaleString()} ₽
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                fullWidth
                                                variant={selectedPreset?.id === preset.id ? 'contained' : 'outlined'}
                                                onClick={() => setSelectedPreset(preset)}
                                                sx={{
                                                    borderColor: '#4CAF50',
                                                    color: selectedPreset?.id === preset.id ? 'white' : '#4CAF50',
                                                    backgroundColor: selectedPreset?.id === preset.id ? '#4CAF50' : 'transparent',
                                                }}
                                            >
                                                {selectedPreset?.id === preset.id ? 'Выбрано' : 'Выбрать'}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Создать свой пресет
                            </Typography>
                            <Card sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Название пресета"
                                            variant="outlined"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Периодичность</InputLabel>
                                            <Select
                                                value={frequency}
                                                onChange={(e) => setFrequency(e.target.value)}
                                                label="Периодичность"
                                            >
                                                <MenuItem value="daily">Ежедневно</MenuItem>
                                                <MenuItem value="weekly">Еженедельно</MenuItem>
                                                <MenuItem value="monthly">Ежемесячно</MenuItem>
                                                <MenuItem value="custom">Произвольная</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DatePicker
                                            label="Дата первой доставки"
                                            value={deliveryDate}
                                            onChange={(newValue) => setDeliveryDate(newValue)}
                                            slots={{
                                                textField: (params) => <TextField {...params} fullWidth size="small" />,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Товары в пресете
                                        </Typography>
                                        {customItems.map((item, index) => (
                                            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                                <TextField
                                                    fullWidth
                                                    value={item}
                                                    onChange={(e) => handleItemChange(index, e.target.value)}
                                                    placeholder="Название товара"
                                                    size="small"
                                                />
                                                <IconButton
                                                    onClick={() => handleRemoveItem(index)}
                                                    disabled={customItems.length === 1}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button
                                            startIcon={<AddIcon />}
                                            onClick={handleAddItem}
                                            sx={{ mt: 1 }}
                                        >
                                            Добавить товар
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ position: 'sticky', top: 100, p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Итог планирования
                            </Typography>

                            {selectedPreset && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Выбранный пресет:
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                                        {selectedPreset.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Периодичность: {frequency === 'weekly' ? 'Еженедельно' : 'Ежемесячно'}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        {selectedPreset.price.toLocaleString()} ₽
                                    </Typography>
                                </Box>
                            )}

                            <Typography variant="body2" color="text.secondary" paragraph>
                                💡 Преимущества планирования:
                            </Typography>
                            <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
                                <li>Автоматические заказы</li>
                                <li>Скидка 10% на регулярные заказы</li>
                                <li>Приоритетная доставка</li>
                                <li>Легко отменить в любой момент</li>
                            </ul>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleCreatePreset}
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
                                Активировать планирование
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default OrderPlanning;