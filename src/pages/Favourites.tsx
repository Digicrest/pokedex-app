import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Grid2 as Grid, Container, Typography } from '@mui/material';
import PokemonCard from '../components/PokemonCard';

const Favorites: React.FC = () => {
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const [favoritesData, setFavoritesData] = useState<any[]>([]);

    useEffect(() => {
        const fetchFavoritesData = async () => {
            const responses = await Promise.all(
                favorites.map((name) => fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => res.json()))
            );
            setFavoritesData(responses);
        };

        if (favorites.length > 0) {
            fetchFavoritesData();
        }
    }, [favorites]);

    if (favorites.length === 0) {
        return (
            <Container>
                <Typography variant="h5">No favorites yet!</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4">My Favorites</Typography>
            <Grid container spacing={2}>
                {favoritesData.map((pokemon) => (
                    <Grid key={pokemon.name} size={3}>
                        <PokemonCard
                            name={pokemon.name}
                            image={pokemon.sprites.front_default}
                            types={pokemon.types.map((typeInfo: any) => typeInfo.type.name)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Favorites;
