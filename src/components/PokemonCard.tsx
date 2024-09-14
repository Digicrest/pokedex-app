import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import { typeColors } from '../utils/typeColors';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { Skeleton } from '@mui/material';

interface PokemonCardProps {
    name: string;
    image: string;
    types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, types }) => {
    const primaryType = types[0];
    const typeColor = typeColors[primaryType] || '#777';
    const [imgLoaded, setImgLoaded] = useState(false);

    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.includes(name);

    const handleFavoriteClick = () => {
        dispatch(toggleFavorite(name));
    };

    const StyledCard = styled(Card)(({ theme }: any) => {
        console.log('typecolor', typeColor);
        return {
            backgroundColor: typeColor,
            color: theme.palette.getContrastText(typeColor),
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.05)',
            },
        }
    });

    const MotionCard = motion(StyledCard as any);

    return (
        <MotionCard
            typeColor={typeColor}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <CardActionArea component={Link} to={`/pokemon/${name}`}>
                <StyledCard color={typeColor}>
                    <CardActionArea component={Link} to={`/pokemon/${name}`}>
                        <CardContent>
                            {!imgLoaded && <Skeleton variant="rectangular" width={120} height={120} />}
                            <img
                                src={image}
                                alt={name}
                                width="120"
                                height="120"
                                style={{ display: imgLoaded ? 'block' : 'none' }}
                                onLoad={() => setImgLoaded(true)}
                            />
                            <Typography variant="h6">{name.toUpperCase()}</Typography>
                            <Typography variant="body2">Types: {types.join(', ')}</Typography>
                        </CardContent>
                    </CardActionArea>
                </StyledCard>
            </CardActionArea>
            <IconButton onClick={handleFavoriteClick} color="secondary">
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
        </MotionCard>
    );
};

export default PokemonCard;
