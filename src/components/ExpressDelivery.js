import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Grid,
    TextField,
    Slider,
    FormControlLabel,
    Switch,
    Alert,
} from '@mui/material';
import {
    Timer as TimerIcon,
    Bolt as BoltIcon,
    Warning as WarningIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';

const ExpressDelivery = ({ store, onConfirm }) => {
    const [urgentMode, setUrgentMode] = useState(false);
    const [tipAmount, setTipAmount] = useState(0);
    const [specialInstructions, setSpecialInstructions] = useState('');

    const deliveryFee = urgentMode ? 499 : 299;
    const deliveryTime = urgentMode ? '15 минут' : '30 минут';
    const totalFee = deliveryFee + tipAmount;

    const tipOptions = [0, 100, 200, 500];

    return (
        <Card sx={{ mb: 3, border: '2px solid #FF6B6B', borderRadius: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <BoltIcon sx={{ color: '#FF6B6B', fontSize: 30 }} />
                    <Typography variant="h5" fontWeight="bold">
                        Экспресс-доставка за 15 минут
                    </Typography>
                    <Chip
                        label="СУПЕР СКОРО"
                        size="small"
                        sx={{
                            bgcolor: '#FF6B6B',
                            color: 'white',
                            fontWeight: 'bold',
                            ml: 'auto',
                        }}
                    />
                </Box>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Максимально быстрая доставка. Курьер отправится к вам сразу после оформления заказа.
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {urgentMode ? 'СУПЕР СРОЧНО' : 'Экспресс'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {deliveryTime} • Приоритетный курьер
                                    </Typography>
                                </Box>
                                <Typography variant="h4" color="primary">
                                    {deliveryFee} ₽
                                </Typography>
                            </Box>
                        </Card>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={urgentMode}
                                    onChange={(e) => setUrgentMode(e.target.checked)}
                                    color="error"
                                />
                            }
                            label={
                                <Box>
                                    <Typography>Режим "СУПЕР СРОЧНО"</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        +200 ₽ • Гарантия 15 минут или возврат денег
                                    </Typography>
                                </Box>
                            }
                        />

                        <Alert severity="warning" sx={{ mt: 2 }}>
                            <WarningIcon />
                            В режиме "СУПЕР СРОЧНО" заказ нельзя отменить
                        </Alert>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom>
                            Чаевые курьеру (опционально)
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            {tipOptions.map((tip) => (
                                <Chip
                                    key={tip}
                                    label={tip === 0 ? 'Без чаевых' : `+${tip} ₽`}
                                    onClick={() => setTipAmount(tip)}
                                    variant={tipAmount === tip ? 'filled' : 'outlined'}
                                    sx={{
                                        bgcolor: tipAmount === tip ? '#4CAF50' : 'transparent',
                                        color: tipAmount === tip ? 'white' : 'inherit',
                                    }}
                                />
                            ))}
                        </Box>

                        <TextField
                            fullWidth
                            label="Особые указания для курьера"
                            placeholder="Например: позвонить заранее, не звонить в дверь и т.д."
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            multiline
                            rows={2}
                            sx={{ mb: 2 }}
                        />

                        <Card sx={{ p: 2, bgcolor: '#FFF3E0' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Условия экспресс-доставки:
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                <li>Максимум 10 товаров в заказе</li>
                                <li>Только в пределах 5 км от магазина</li>
                                <li>Оплата только онлайн</li>
                                <li>Курьер имеет приоритет на дороге</li>
                            </ul>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h6">Итого за доставку:</Typography>
                        <Typography variant="h4" color="primary" fontWeight="bold">
                            {totalFee.toLocaleString()} ₽
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            *Без учета стоимости товаров
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<TimerIcon />}
                        onClick={onConfirm}
                        sx={{
                            bgcolor: '#FF6B6B',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            '&:hover': {
                                bgcolor: '#E55A5A',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Заказать экспресс-доставку
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ExpressDelivery;