import { StyleSheet, Text, TextInput, View, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';
import PokeCard from '../components/PokeCard';

export default function App() {

    const [text, onChangeText] = useState('');
    const [pokemonData, setPokemonData] = useState([]);
    const [returnText, setReturnText] = useState('Search a pokemon by his english name');

    async function searchPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + text);

            if (!response.ok) {
                setReturnText('Pokemon not found');
                setPokemonData([]);
                return;
            }

            const json = await response.json();
            setPokemonData(json);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Enter a pokemon name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Pikachu"
                    keyboardType='default'
                />
                <Button
                    onPress={searchPokemon}
                    title='Research'
                />
            </View>
            {pokemonData.name !== undefined ? (
                    <View style={styles.resultView}>
                        <Text>{pokemonData.name}</Text>
                    </View>
                ) : (
                    <View>
                        <Text>{returnText}</Text>
                    </View>
                )
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
