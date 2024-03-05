import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import PokeCard from '../components/PokeCard';

export default function App() {

    const [text, onChangeText] = useState('');
    const [pokemonData, setPokemonData] = useState([]);
    const [returnText, setReturnText] = useState('Search a pokemon by his english name');
    const lowerText = text.toLowerCase();

    async function searchPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + lowerText)

            if (!response.ok) {
                setReturnText('Pokemon not found');
                setPokemonData([]);
                return;
            }

            const json = await response.json();
            setPokemonData(json);

            
            console.log('test', json.sprites )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text>Enter a pokemon name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Pikachu"
                        keyboardType='default'
                    />
                    <TouchableOpacity style={styles.button} onPress={searchPokemon}>
                        <Text style={styles.textButton}>Cliquez ici</Text>
                    </TouchableOpacity>
                </View>
                {pokemonData.name !== undefined ? (
                        <View style={styles.result}>
                        <PokeCard pokemon={pokemonData}/>
                        </View>
                    ) : (
                        <View style={styles.result}>
                            <Text>{returnText}</Text>
                        </View>
                    )
                }
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        margin: 30,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        paddingLeft: 10,
        marginVertical: 10,
        borderRadius: 5,
        color: '#333',
    },
    button: {
        backgroundColor: '#2e2e2e',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    result: {
        marginHorizontal: 30,
    },
});
