import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import getPokemonsFromApi from '../api/api';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokeCard from '../components/PokeCard';

export default function App() {

    const [pokemonData, setPokemonData] = useState([]);
    const [nextPage, setNextPage] = useState('');

    useEffect(() => {
        // AsyncStorage.clear()
        getPokemonsFromApi('https://pokeapi.co/api/v2/pokemon').then((data) => {
            setPokemonData([...pokemonData, ...data.results]);
            setNextPage(data.next);        
        })
    }, []);   

    return (
        <SafeAreaView style={styles.container}>
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
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
});
