// src/pages/PokemonDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextToSpeech } from '../components/TextToSpeech';
import { createTheme } from '@mui/material/styles';
import { typeColors } from '../utils/typeColors';
import {
    Container,
    Typography,
    Chip,
    CircularProgress,
    Grid2 as Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';



const PokemonDetail: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemonData, setPokemonData] = useState<any>(null);
    const [speciesData, setSpeciesData] = useState<any>(null);
    const [encounterData, setEncounterData] = useState<any>(null);

    useEffect(() => {
        const fetchEncounterData = async () => {
            const response = await axios.get(pokemonData.location_area_encounters);
            setEncounterData(response.data);
        };
        if (pokemonData) {
            fetchEncounterData();
        }
    }, [pokemonData]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            const [pokemonResponse, speciesResponse] = await Promise.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
            ]);
            setPokemonData(pokemonResponse.data);
            setSpeciesData(speciesResponse.data);
        };
        fetchPokemonData();
    }, [name]);

    if (!pokemonData || !speciesData) return <div>Loading...</div>;

    const types = pokemonData.types.map((typeInfo: any) => typeInfo.type.name);
    const abilities = pokemonData.abilities.map((ab: any) => ab.ability.name);
    const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
    );
    const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/(\r\n|\n|\r)/gm, ' ') : 'No description available.';

    // Theming based on primary type
    const primaryType = types[0]; // Use the first type as the primary
    const themeColor = typeColors[primaryType] || '#fff';
    const theme = createTheme({
        palette: {
            primary: {
                main: themeColor,
            },
        },
    });

    const typeColor = typeColors[types[0]] || '#777';
    const StyledContainer = styled(Container)(({ theme }: any) => ({
        backgroundColor: typeColor,
        color: theme.palette.getContrastText(typeColor),
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2),
        marginTop: theme.spacing(4),
    }));


    if (!pokemonData || !speciesData) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }


    return (
        <StyledContainer color={themeColor}>
            <Grid container spacing={2}>
                {/* Image and Name */}
                <Grid size={4}>
                    <img
                        src={pokemonData.sprites.other['official-artwork'].front_default}
                        alt={pokemonData.name}
                        width="100%"
                    />
                </Grid>

                {/* Details */}
                <Grid size={8}>
                    <Typography variant="h3">{pokemonData.name.toUpperCase()}</Typography>
                    <div>
                        {types.map((type: string) => (
                            <Chip
                                key={type}
                                label={type.toUpperCase()}
                                style={{
                                    backgroundColor: typeColors[type],
                                    color: '#fff',
                                    marginRight: 8,
                                }}
                            />
                        ))}
                    </div>

                    <Typography variant="body1" paragraph>
                        {description}
                    </Typography>

                    <TextToSpeech text={description} />

                    <Typography variant="h6">Abilities</Typography>
                    <ul>
                        {abilities.map((ability: string) => (
                            <li key={ability}>{ability}</li>
                        ))}
                    </ul>

                    {/* Stats */}
                    <Typography variant="h6">Stats</Typography>
                    <Grid container spacing={1}>
                        {pokemonData.stats.map((stat: any) => (
                            <Grid size={4} key={stat.stat.name}>
                                <Typography variant="body2">
                                    {stat.stat.name.toUpperCase()}: {stat.base_stat}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default PokemonDetail;
