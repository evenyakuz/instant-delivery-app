import React, { useContext, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Avatar,
    TextField,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    Chip,
    Tab,
    Tabs,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Person as PersonIcon,
    History as HistoryIcon,
    ShoppingBag as OrderIcon,
    LocationOn as LocationIcon,
    Edit as EditIcon,
    Logout as LogoutIcon,
    Store as StoreIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, viewHistory } = useContext(AuthContext);
    const { darkMode, language } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [editDialog, setEditDialog] = useState(false);
    const [userData, setUserData] = useState({
        name: user?.name || 'Иван Иванов',
        email: user?.email || 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        city: user?.city || 'Москва',
        address: 'ул. Примерная, д. 1, кв. 1',
    });

    const mockOrders = [
        {
            id: 'ORD-001',
            date: '2024-01-15',
            items: ['Продукты на неделю', 'Цветы'],
            total: 4500,
            status: 'delivered',
            deliveryTime: '30 мин',
        },
        {
            id: 'ORD-002',
            date: '2024-01-10',
            items: ['Ноутбук', 'Наушники'],
            total: 125000,
            status: 'delivered',
            deliveryTime: '45 мин',
        },
        {
            id: 'ORD-003',
            date: '2024-01-05',
            items: ['Одежда', 'Обувь'],
            total: 15000,
            status: 'processing',
            deliveryTime: '1 час',
        },
    ];

    const handleLogin = () => {
        // В реальном приложении здесь была бы форма входа
        const mockUser = {
            id: '1',
            name: 'Иван Иванов',
            email: 'test@example.com',
            city: 'Москва',
            orders: mockOrders,
        };
        // В контексте есть login функция
        navigate('/');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSaveChanges = () => {
        // Здесь будет сохранение изменений
        setEditDialog(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'success';
            case 'processing': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, bgcolor: '#4CAF50' }}>
                        <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        Войдите в аккаунт
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Войдите, чтобы просматривать заказы, историю и управлять профилем
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
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
                        Войти
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Box sx={{ p: 3, textAlign: 'center', bgcolor: '#4CAF50', color: 'white' }}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: 'white',
                                    color: '#4CAF50',
                                    fontSize: 40,
                                }}
                            >
                                {user.name.charAt(0)}
                            </Avatar>
                            <Typography variant="h5">{user.name}</Typography>
                            <Typography variant="body2">{user.email}</Typography>
                            <Chip
                                label="Premium"
                                size="small"
                                sx={{ mt: 1, bgcolor: 'white', color: '#4CAF50' }}
                            />
                        </Box>
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
                                            <LocationIcon sx={{ color: '#4CAF50' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Город"
                                        secondary={userData.city}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
                                            <StoreIcon sx={{ color: '#4CAF50' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Адрес доставки"
                                        secondary={userData.address}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
                                            <StarIcon sx={{ color: '#4CAF50' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Бонусы"
                                        secondary="1250 баллов"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardActions sx={{ flexDirection: 'column', gap: 1, p: 2 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => setEditDialog(true)}
                                sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                            >
                                Редактировать профиль
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                sx={{ backgroundColor: '#f44336' }}
                            >
                                Выйти
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': { fontWeight: 600 },
                            }}
                        >
                            <Tab icon={<OrderIcon />} iconPosition="start" label="Мои заказы" />
                            <Tab icon={<HistoryIcon />} iconPosition="start" label="История просмотров" />
                        </Tabs>

                        {activeTab === 0 && (
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    История заказов
                                </Typography>
                                {mockOrders.map((order) => (
                                    <Card key={order.id} sx={{ mb: 2, borderRadius: 2 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {order.id}
                                                </Typography>
                                                <Chip
                                                    label={order.status === 'delivered' ? 'Доставлен' : 'В обработке'}
                                                    color={getStatusColor(order.status)}
                                                    size="small"
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {new Date(order.date).toLocaleDateString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </Typography>
                                            <Typography variant="body2" paragraph>
                                                {order.items.join(', ')}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2">
                                                    Доставка: {order.deliveryTime}
                                                </Typography>
                                                <Typography variant="h6" color="primary">
                                                    {order.total.toLocaleString()} ₽
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <Button size="small">Повторить заказ</Button>
                                            <Button size="small" variant="contained">
                                                Подробнее
                                            </Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        )}

                        {activeTab === 1 && (
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Недавно просмотренные товары
                                </Typography>
                                {viewHistory.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {viewHistory.slice(0, 6).map((product) => (
                                            <Grid item xs={12} sm={6} key={product.id}>
                                                <Card sx={{ display: 'flex', borderRadius: 2 }}>
                                                    <Box
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            bgcolor: 'grey.100',
                                                            backgroundImage: `url(${product.image})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            borderRadius: '8px 0 0 8px',
                                                        }}
                                                    />
                                                    <Box sx={{ flex: 1, p: 1.5 }}>
                                                        <Typography variant="body2" fontWeight="medium">
                                                            {product.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {product.category}
                                                        </Typography>
                                                        <Typography variant="h6" color="primary">
                                                            {product.price?.toLocaleString()} ₽
                                                        </Typography>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography color="text.secondary" textAlign="center" py={4}>
                                        Вы еще не просматривали товары
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Редактирование профиля</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Имя"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Телефон"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Город"
                            value={userData.city}
                            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Адрес доставки"
                            value={userData.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                            multiline
                            rows={2}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialog(false)}>Отмена</Button>
                    <Button onClick={handleSaveChanges} variant="contained">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;