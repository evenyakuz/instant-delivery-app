import React from 'react';
import { Box, Chip } from '@mui/material';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                py: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
            }}
        >
            {categories.map((category) => (
                <Chip
                    key={category.id}
                    label={`${category.icon} ${category.name}`}
                    onClick={() => onSelectCategory(category.id)}
                    sx={{
                        px: 2,
                        py: 3,
                        fontSize: '0.95rem',
                        backgroundColor: selectedCategory === category.id ? '#4CAF50' : 'transparent',
                        color: selectedCategory === category.id ? 'white' : 'inherit',
                        border: selectedCategory === category.id ? 'none' : '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            backgroundColor: selectedCategory === category.id ? '#388E3C' : 'action.hover',
                        },
                        transition: 'all 0.2s',
                        flexShrink: 0,
                    }}
                />
            ))}
        </Box>
    );
};

export default CategoryFilter;