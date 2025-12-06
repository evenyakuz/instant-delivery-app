import React, { useContext } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Tooltip,
} from '@mui/material';
import {
    Bolt as BoltIcon,
    RocketLaunch as RocketIcon,
    Schedule as ScheduleIcon,
    DirectionsRun as RunIcon,
} from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { deliverySpeeds } from '../styles/theme';

const DeliverySpeed = () => {
    const { selectedDelivery, setSelectedDelivery } = useContext(CartContext);

    const getIcon = (id) => {
        switch (id) {
            case 'instant': return <BoltIcon />;
            case 'fast': return <RunIcon />;
            case 'standard': return <ScheduleIcon />;
            case 'scheduled': return <RocketIcon />;
            default: return <ScheduleIcon />;
        }
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BoltIcon color="primary" />
                    Скорость доставки
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        *Без наценок на товары
                    </Typography>
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                    Фиксированная стоимость за категорию товаров. Вы платите только за скорость доставки!
                </Typography>

                <RadioGroup
                    value={selectedDelivery}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                    sx={{ gap: 1 }}
                >
                    {deliverySpeeds.map((speed) => (
                        <Tooltip key={speed.id} title={`Доставка: ${speed.description}`} arrow>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    border: selectedDelivery === speed.id ? `2px solid ${speed.color}` : '1px solid',
                                    borderColor: selectedDelivery === speed.id ? speed.color : 'divider',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        borderColor: speed.color,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 4px 20px ${speed.color}20`,
                                    },
                                }}
                            >
                                <FormControlLabel
                                    value={speed.id}
                                    control={<Radio sx={{ ml: 1 }} />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', p: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ color: speed.color }}>
                                                    {getIcon(speed.id)}
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        {speed.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {speed.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="h6" fontWeight="bold" color="primary">
                                                {speed.price} ₽
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Card>
                        </Tooltip>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default DeliverySpeed;