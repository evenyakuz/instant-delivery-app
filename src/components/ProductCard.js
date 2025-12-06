import React, { useContext } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    IconButton,
    Rating,
} from '@mui/material';
import {
    AddShoppingCart as AddCartIcon,
    FavoriteBorder as FavoriteIcon,
    Favorite as FavoriteFilledIcon,
    Bolt as BoltIcon,
} from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product, onViewDetails }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);
    const { addToCart } = useContext(CartContext);
    const { addToViewHistory } = useContext(AuthContext);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleClick = () => {
        addToViewHistory(product);
        if (onViewDetails) {
            onViewDetails(product);
        }
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                },
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />

                <Chip
                    label={product.deliveryTime}
                    size="small"
                    icon={<BoltIcon />}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'rgba(76, 175, 80, 0.95)',
                        color: 'white',
                        fontWeight: 'bold',
                        backdropFilter: 'blur(4px)',
                    }}
                />

                <IconButton
                    onClick={handleToggleFavorite}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s',
                    }}
                >
                    {isFavorite ? (
                        <FavoriteFilledIcon sx={{ color: '#f44336' }} />
                    ) : (
                        <FavoriteIcon />
                    )}
                </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {product.store}
                </Typography>

                <Typography variant="h6" component="div" gutterBottom sx={{ lineHeight: 1.3 }}>
                    {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {product.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.reviews || 0})
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        {product.price.toLocaleString()} ₽
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddCartIcon />}
                        onClick={handleAddToCart}
                        sx={{
                            backgroundColor: '#4CAF50',
                            borderRadius: 2,
                            px: 2,
                            '&:hover': {
                                backgroundColor: '#388E3C',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s',
                        }}
                    >
                        В корзину
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;