import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Detail = ({route, navigation }) => {

    const data = route.params.data;
    const img = route.params.img;

    const [isSaved, setIsSaved] = useState(false);

    const checkIfSaved = async () => {
        try {
            const savedPokemons = JSON.parse(await AsyncStorage.getItem("saved-pokemons"));

            if (savedPokemons !== null && savedPokemons.length > 0) {
                for (let i = 0; i < savedPokemons.length; i++) {
                    if (savedPokemons[i].id === data.id) {
                        setIsSaved(true);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const savePokemon = async () => {
        try {
            const savedPokemons = JSON.parse(await AsyncStorage.getItem("saved-pokemons"));
            if (savedPokemons !== null) {
                await AsyncStorage.setItem("saved-pokemons", JSON.stringify([...savedPokemons, data]));
            } else {
                await AsyncStorage.setItem("saved-pokemons", JSON.stringify([data]));
            }
            setIsSaved(true);
        } catch (e) {
            console.log(e);
        }
    };

    const removePokemon = async () => {
        try {
            const savedPokemons = JSON.parse(await AsyncStorage.getItem("saved-pokemons"));
            if (savedPokemons !== null) {
                const newSavedPokemons = savedPokemons.filter((pokemon) => pokemon.id !== data.id);
                await AsyncStorage.setItem("saved-pokemons", JSON.stringify(newSavedPokemons));
                setIsSaved(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { 
        checkIfSaved()
    }, [])

    return (
        <View>
            <Text>{data.name}</Text>
            {
                img ? <Image style={styles.tinyLogo} source={{uri: img.front_default}}/> : <Image style={styles.tinyLogo} source={pokeball} />
            }
            <Pressable style={styles.button} onPress={isSaved ? removePokemon : savePokemon}>
                <Text style={styles.textButton}>{ isSaved ? 'saved' : 'unsaved' }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '33%',
        marginBottom: 30,
    },
    subcontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default Detail