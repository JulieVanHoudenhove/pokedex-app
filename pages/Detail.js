import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";

const Detail = ({route, navigation }) => {

    const data = route.params.data;
    const img = route.params.img;

    useEffect(() => { 
        console.log(route)
    }, [])

    return (
        <View>
            <Text>Detail</Text>
            <Text>{data.name}</Text>
            {
                img ? <Image style={styles.tinyLogo} source={{uri: img.front_default}}/> : <Image style={styles.tinyLogo} source={pokeball} />
            }
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
    }
});

export default Detail