import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import pokeball from '../assets/pokeball.png'

const PokeCard = ({pokemon}) => {

    const [pokemonDetailsData, setPokemonDetailsData] = useState([]);
    const [pokemonImg, setPokemonImg] = useState(null);

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
        getPokemonsDetailsFromApi().then((data) => {
            setPokemonDetailsData(data);
            setPokemonImg(data.sprites);
        })

    }, []);

  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.subcontainer}>
            {
                pokemonImg ? <Image style={styles.tinyLogo} source={{uri: pokemonImg.front_default}}/> : <Image style={styles.tinyLogo} source={pokeball} />
            }
            <Text>{pokemon.name}</Text>
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
        width: '33,33%',
        justifyContent: 'space-between',
    },
    subcontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default PokeCard