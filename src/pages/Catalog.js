import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    TextField,
    InputAdornment,
    Chip,
    Slider,
    FormControlLabel,
    Checkbox,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Drawer,
    IconButton,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Close as CloseIcon,
    LocalShipping as ShippingIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('relevance');
    const [page, setPage] = useState(1);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const { addToCart } = useContext(CartContext);
    const { addToViewHistory } = useContext(AuthContext);

    const categories = [
        { id: 'food', name: 'Продукты' },
        { id: 'clothes', name: 'Одежда' },
        { id: 'electronics', name: 'Техника' },
        { id: 'flowers', name: 'Цветы' },
        { id: 'home', name: 'Для дома' },
        { id: 'office', name: 'Офис' },
        { id: 'sports', name: 'Спорт' },
        { id: 'beauty', name: 'Красота' },
    ];

    const mockProducts = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Товар ${i + 1} ${searchQuery ? `(${searchQuery})` : ''}`,
        description: 'Высококачественный товар с быстрой доставкой',
        price: Math.floor(Math.random() * 50000) + 100,
        category: categories[Math.floor(Math.random() * categories.length)].id,
        image: `https://picsum.photos/300/200?random=${i + 101}`,
        store: `Магазин ${Math.floor(i / 20) + 1}`,
        deliveryTime: `${Math.floor(Math.random() * 45) + 15} мин`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 1000),
        inStock: Math.random() > 0.1,
    }));

    useEffect(() => {
        // Имитация загрузки данных
        setProducts(mockProducts);
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Фильтр по поисковому запросу
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.store.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Фильтр по цене
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Фильтр по категориям
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // Сортировка
        switch (sortBy) {
            case 'price_asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
        setPage(1);
    }, [products, searchQuery, priceRange, selectedCategories, sortBy]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSearchParams({ search: searchQuery });
        }
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleProductClick = (product) => {
        addToViewHistory(product);
    };

    const productsPerPage = 12;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Каталог товаров
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Все товары в одном месте'}
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Поиск товаров, магазинов, категорий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearchQuery('')} size="small">
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            backgroundColor: 'background.paper',
                        },
                    }}
                />
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card sx={{ p: 2, borderRadius: 3, position: 'sticky', top: 100 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">Фильтры</Typography>
                            <IconButton
                                onClick={() => setFilterDrawerOpen(true)}
                                sx={{ display: { md: 'none' } }}
                            >
                                <FilterIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography gutterBottom>Категории</Typography>
                            <Box sx={{ mb: 3 }}>
                                {categories.map((category) => (
                                    <FormControlLabel
                                        key={category.id}
                                        control={
                                            <Checkbox
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => handleCategoryChange(category.id)}
                                                size="small"
                                            />
                                        }
                                        label={category.name}
                                        sx={{ display: 'block', mb: 0.5 }}
                                    />
                                ))}
                            </Box>

                            <Typography gutterBottom>Цена, ₽</Typography>
                            <Box sx={{ px: 1, mb: 3 }}>
                                <Slider
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={50000}
                                    step={1000}
                                    sx={{ color: '#4CAF50' }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="body2">{priceRange[0].toLocaleString()} ₽</Typography>
                                    <Typography variant="body2">{priceRange[1].toLocaleString()} ₽</Typography>
                                </Box>
                            </Box>

                            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel>Сортировка</InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    label="Сортировка"
                                >
                                    <MenuItem value="relevance">По релевантности</MenuItem>
                                    <MenuItem value="price_asc">По возрастанию цены</MenuItem>
                                    <MenuItem value="price_desc">По убыванию цены</MenuItem>
                                    <MenuItem value="rating">По рейтингу</MenuItem>
                                    <MenuItem value="newest">Сначала новые</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setPriceRange([0, 50000]);
                                    setSortBy('relevance');
                                    setSearchQuery('');
                                }}
                                sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                            >
                                Сбросить фильтры
                            </Button>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            Найдено: {filteredProducts.length} товаров
                        </Typography>
                        <Chip
                            label={`Страница ${page} из ${totalPages}`}
                            size="small"
                            variant="outlined"
                        />
                    </Box>

                    {currentProducts.length > 0 ? (
                        <>
                            <Grid container spacing={3}>
                                {currentProducts.map((product) => (
                                    <Grid item xs={12} sm={6} lg={4} key={product.id}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ position: 'relative' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="180"
                                                    image={product.image}
                                                    alt={product.name}
                                                    onClick={() => handleProductClick(product)}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                                {!product.inStock && (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            bgcolor: 'rgba(0,0,0,0.5)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Chip label="Нет в наличии" color="error" />
                                                    </Box>
                                                )}
                                            </Box>
                                            <CardContent>
                                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                                    {product.store}
                                                </Typography>
                                                <Typography variant="h6" component="div" gutterBottom>
                                                    {product.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <StarIcon sx={{ fontSize: 18, color: '#FFC107', mr: 0.5 }} />
                                                    <Typography variant="body2" mr={1}>
                                                        {product.rating}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        ({product.reviews} отзывов)
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {product.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <ShippingIcon sx={{ fontSize: 18, mr: 1, color: '#4CAF50' }} />
                                                    <Typography variant="body2">
                                                        {product.deliveryTime} • Фиксированная доставка
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="h5" color="primary" fontWeight="bold">
                                                        {product.price.toLocaleString()} ₽
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleAddToCart(product)}
                                                        disabled={!product.inStock}
                                                        sx={{
                                                            backgroundColor: '#4CAF50',
                                                            '&:hover': { backgroundColor: '#388E3C' },
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

                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={(e, value) => setPage(value)}
                                        color="primary"
                                        size="large"
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                borderRadius: 2,
                                            },
                                            '& .Mui-selected': {
                                                backgroundColor: '#4CAF50 !important',
                                                color: 'white',
                                            },
                                        }}
                                    />
                                </Box>
                            )}
                        </>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" gutterBottom>
                                Товары не найдены
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Попробуйте изменить параметры поиска или фильтры
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>

            <Drawer
                anchor="right"
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
            >
                <Box sx={{ width: 300, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Фильтры</Typography>
                        <IconButton onClick={() => setFilterDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Typography gutterBottom>Категории</Typography>
                    <Box sx={{ mb: 3 }}>
                        {categories.map((category) => (
                            <FormControlLabel
                                key={category.id}
                                control={
                                    <Checkbox
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                        size="small"
                                    />
                                }
                                label={category.name}
                                sx={{ display: 'block', mb: 0.5 }}
                            />
                        ))}
                    </Box>

                    <Typography gutterBottom>Цена, ₽</Typography>
                    <Box sx={{ px: 1, mb: 3 }}>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={50000}
                            step={1000}
                            sx={{ color: '#4CAF50' }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2">{priceRange[0].toLocaleString()} ₽</Typography>
                            <Typography variant="body2">{priceRange[1].toLocaleString()} ₽</Typography>
                        </Box>
                    </Box>

                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel>Сортировка</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            label="Сортировка"
                        >
                            <MenuItem value="relevance">По релевантности</MenuItem>
                            <MenuItem value="price_asc">По возрастанию цены</MenuItem>
                            <MenuItem value="price_desc">По убыванию цены</MenuItem>
                            <MenuItem value="rating">По рейтингу</MenuItem>
                            <MenuItem value="newest">Сначала новые</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            setSelectedCategories([]);
                            setPriceRange([0, 50000]);
                            setSortBy('relevance');
                            setFilterDrawerOpen(false);
                        }}
                        sx={{ backgroundColor: '#4CAF50' }}
                    >
                        Применить фильтры
                    </Button>
                </Box>
            </Drawer>
        </Container>
    );
};

export default Catalog;