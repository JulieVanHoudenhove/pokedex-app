import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import getPokemonsFromApi from '../api/api';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PokeCard from '../components/PokeCard';

export default function App() {

    const [savedPokemons, setSavedPokemons] = useState([]);

    const getData = async () => {
        try {
            const savedPokemons = await AsyncStorage.getItem("saved-pokemons");
            if (savedPokemons !== null) {
                setSavedPokemons(JSON.parse(savedPokemons).reverse());
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getData();
    }, [savedPokemons]);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Teams</Text>
            {
                savedPokemons.length === 0
                    ?
                    <Text>Vous avez pas de pokemon dans votre team</Text>
                    : 
                    <FlatList
                        style={styles.list}
                        data={savedPokemons}
                        numColumns={3}
                        renderItem={(pokemon) => <PokeCard pokemon={pokemon.item}></PokeCard>}
                        keyExtractor={pokemon => pokemon.id}
                    />
            }
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
