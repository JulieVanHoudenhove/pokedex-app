import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import getPokemonsFromApi from '../api/api';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PokeCard from '../components/PokeCard';
import { useIsFocused } from "@react-navigation/native";

export default function App() {

    const [savedPokemons, setSavedPokemons] = useState([]);
    const isFocused = useIsFocused();

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
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            {
                savedPokemons.length === 0 || savedPokemons === null
                    ?
                    <Text>Vous avez pas de pokemon dans votre team</Text>
                    : 
                    <FlatList
                        style={styles.list}
                        data={savedPokemons}
                        numColumns={3}
                        renderItem={(pokemon) => <PokeCard pokemon={pokemon.item}></PokeCard>}
                        keyExtractor={pokemon => pokemon.name}
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
