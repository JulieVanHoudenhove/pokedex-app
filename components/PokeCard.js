import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import pokeball from '../assets/pokeball.png'
import { useNavigation } from "@react-navigation/native";

const PokeCard = ({pokemon}) => {
    const navigation = useNavigation();
    const [pokemonDetailsData, setPokemonDetailsData] = useState([]);
    const [pokemonImg, setPokemonImg] = useState(null);
    
    function capitalizeFirstLetter(string) {
        if (string === undefined)
            return '';

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getPokemonsDetailsFromApi = async () => {
        try {
            const response = await fetch(pokemon.url + '/');
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        };
    };
    
    useEffect(() => {
        if (pokemon.sprites) {
                setPokemonImg(pokemon.sprites);
                setPokemonDetailsData(pokemon)
        } else {
            getPokemonsDetailsFromApi().then((data) => {
                setPokemonDetailsData(data);
                setPokemonImg(data.sprites);
            })
        }
    }, [pokemon]);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail', {data: pokemonDetailsData, img: pokemonImg})}>
            <View style={styles.subcontainer}>
                {
                    pokemonImg ? <Image style={styles.tinyLogo} source={{uri: pokemonImg.front_default}}/> : <Image style={styles.tinyLogo} source={pokeball} />
                }
                <Text>{capitalizeFirstLetter(pokemon.name)}</Text>
            </View>
        </TouchableOpacity>
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
    }
});

export default PokeCard