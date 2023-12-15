import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import getPokemonsFromApi from '../api/api';
import { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard';

export default function App() {

    const [pokemonData, setPokemonData] = useState([]);
    const [nextPage, setNextPage] = useState('');

    useEffect(() => {
        getPokemonsFromApi('https://pokeapi.co/api/v2/pokemon').then((data) => {
            setPokemonData([...pokemonData, ...data.results]);
            setNextPage(data.next);        
        })
    }, []);   

    return (
        <SafeAreaView style={styles.container}>
            <Text>Home</Text>
            <FlatList
                style={styles.list}
                data={pokemonData}
                numColumns={3}
                renderItem={(pokemon) => <PokeCard pokemon={pokemon.item}></PokeCard>}
                keyExtractor={pokemon => pokemon.name}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    getPokemonsFromApi(nextPage).then((data) => {
                        setPokemonData([...pokemonData, ...data.results]);
                        setNextPage(data.next);
                    })
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    }
});
