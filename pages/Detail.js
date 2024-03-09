import { SafeAreaView, View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Detail = ({route, navigation }) => {

    const data = route.params.data;
    const img = route.params.img;
    
    function capitalizeFirstLetter(string) {
        if (string === undefined)
            return '';

        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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

    
    const getTypeImage = (type) => {
        switch (type) {
            case 'bug':
                return require('../assets/bug.png');
            case 'dark':
                return require('../assets/dark.png'); 
            case 'dragon':
                return require('../assets/dragon.png'); 
            case 'electric':
                return require('../assets/electric.png'); 
            case 'fairy':
                return require('../assets/fairy.png'); 
            case 'fighting':
                return require('../assets/fighting.png'); 
            case 'fire':
                return require('../assets/fire.png'); 
            case 'flying':
                return require('../assets/flying.png'); 
            case 'ghost':
                return require('../assets/ghost.png'); 
            case 'grass':
                return require('../assets/grass.png'); 
            case 'ground':
                return require('../assets/ground.png'); 
            case 'ice':
                return require('../assets/ice.png'); 
            case 'normal':
                return require('../assets/normal.png');
            case 'poison':
                return require('../assets/poison.png');
            case 'psychic':
                return require('../assets/psychic.png'); 
            case 'rock':
                return require('../assets/rock.png'); 
            case 'steel':
                return require('../assets/steel.png'); 
            case 'water':
                return require('../assets/water.png'); 
            default:
                return require('../assets/unknown.png');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={styles.name}>{capitalizeFirstLetter(data.name)}</Text>
                    <View style={styles.blockImage}>
                        {
                            img ? <Image style={styles.tinyLogo} source={{uri: img.front_default}}/> : <Image style={styles.tinyLogo} source={pokeball} />
                        }
                        {
                            img ? <Image style={styles.tinyLogo} source={{uri: img.back_default}}/> : <Image style={styles.tinyLogo} source={pokeball} />
                        }
                    </View>
                    <View style={styles.section}>
                        <View style={styles.infos}>
                            <View style={styles.blockInfo}>
                                <Text style={styles.blockInfoText}>Height</Text>
                                <Text style={styles.infoText}>{data.height / 10} m</Text>
                            </View>
                            <View style={styles.blockInfo}>
                                <Text style={styles.blockInfoText}>Weight</Text>
                                <Text style={styles.infoText}>{data.weight / 10} kg</Text>
                            </View>
                            <View style={styles.blockInfo}>
                                <Text style={styles.blockInfoText}>Abilities</Text>
                                <View style={styles.blockInfo}>
                                    {data.abilities && data.abilities.length > 0 ? (
                                        data.abilities.map((ability, index) => (
                                        <Text style={styles.infoText} key={index}>{capitalizeFirstLetter(ability.ability.name)}</Text>
                                        ))
                                    ) : (
                                        <Text style={styles.infoText}>No abilities found</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.blockInfoText}>Types</Text>
                        <View style={styles.blockType}>
                            {data.types && data.types.length > 0 ? (
                                data.types.map((type, index) => (
                                    <View style={styles.blockInfo} key={index}>
                                        <Image source={getTypeImage(type.type.name)} style={styles.typeImage} />
                                        <Text style={styles.infoText}>{capitalizeFirstLetter(type.type.name)}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.abilitiesText}>No types found</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.blockInfoText}>Shiny version</Text>
                        <View style={styles.blockImage}>
                            {
                                img ? <Image style={styles.tinyLogo} source={{uri: img.front_shiny}}/> : <Image style={styles.tinyLogo} source={pokeball} />
                            }
                            {
                                img ? <Image style={styles.tinyLogo} source={{uri: img.back_shiny}}/> : <Image style={styles.tinyLogo} source={pokeball} />
                            }
                        </View>
                    </View>
                    <Pressable style={ isSaved ? styles.buttonHover : styles.button } onPress={isSaved ? removePokemon : savePokemon}>
                        <Text style={ isSaved ? styles.textButtonHover : styles.textButton}>{ isSaved ? 'Remove from team' : 'Add to team' }</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 200,
        height: 200,
    },
    container: {
        flex: 1,
    },    
    content: {
        display: 'flex',
        flexDirection: 'column',
        margin: 30,
    },
    section: {
        marginBottom: 20,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    infos: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    blockImage: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    blockInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    blockInfoText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    infoText: {
        margin: 10
    },
    button: {
        backgroundColor: '#2e2e2e',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderColor: '#2e2e2e',
        borderWidth: 2,
        marginTop: 10
    },
    buttonHover: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderColor: '#2e2e2e',
        borderWidth: 2,
        marginTop: 10
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textButtonHover: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    typeImage: {
        height: 100,
        width: 100,
    },
    blockType: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
    }
});

export default Detail