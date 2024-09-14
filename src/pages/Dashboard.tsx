// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { fetchAllPokemons } from '../redux/slices/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import PokemonCard from '../components/PokemonCard';
import { Container, TextField, Grid2 as Grid, CircularProgress, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { typeColors } from '../utils/typeColors';

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allPokemons, loading, error } = useAppSelector((state) => state.pokemon);
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonsData, setPokemonsData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedType, setSelectedType] = useState('');

    const filteredPokemons = pokemonsData.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType
            ? pokemon.types.some((typeInfo: any) => typeInfo.type.name === selectedType)
            : true;
        return matchesSearch && matchesType;
    });

    const fetchMorePokemons = () => {
        dispatch(fetchAllPokemons(page + 1)).then((action) => {
            if (action.payload.length === 0) {
                setHasMore(false);
            } else {
                setPage(page + 1);
            }
        });
    };

    const handleTypeChange = (target: HTMLSelectElement) => {
        setSelectedType(target.value);
    }

    useEffect(() => {
        console.log('fetching all pokemons');
        dispatch(fetchAllPokemons(1));
    }, [dispatch]);

    useEffect(() => {
        console.log('fetching pokemons data');
        const fetchPokemonsData = async () => {
            const responses = await Promise.all(
                allPokemons.map((pokemon) => axios.get(pokemon.url))
            );
            const data = responses.map((res) => res.data);
            setPokemonsData(data);
            console.log('data', data);
        };
        fetchPokemonsData();
    }, [allPokemons]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <Container>
            {/* Search Input */}
            <TextField
                label="Search Pokémon"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Type Filter */}
            <Select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target as HTMLSelectElement)}
                displayEmpty
                fullWidth
                variant="outlined"
            >
                <MenuItem value="">
                    <em>All Types</em>
                </MenuItem>
                {Object.keys(typeColors).map((type) => (
                    <MenuItem key={type} value={type}>
                        {type.toUpperCase()}
                    </MenuItem>
                ))}
            </Select>

            {/* Pokémon Grid */}
            <InfiniteScroll
                dataLength={pokemonsData.length}
                next={fetchMorePokemons}
                hasMore={hasMore}
                loader={<CircularProgress />}
            >
                <Grid container spacing={2}>
                    {pokemonsData.map((pokemon) => (
                        <Grid size={3} key={pokemon.name}>
                            <PokemonCard
                                name={pokemon.name}
                                image={pokemon.sprites.front_default}
                                types={pokemon.types.map((typeInfo: any) => typeInfo.type.name)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>

        </Container>
    );
};

export default Dashboard;
