import { StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import getPokemonsFromApi from '../api/api';
import { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard';
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function App() {

    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    const openCamera = () => {
        navigation.navigate("Camera")
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileView}>
                    <Image style={styles.profileImage} source={require('../assets/sacha.png')} />
                    <Text style={styles.username}>Username</Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.button} onPress={openCamera}>
                        <Text style={styles.textButton}>Open camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.textButton}>Pick an image from camera roll</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {image && <Image source={{ uri: image }} style={styles.imagePick} />}
                </View>
            </ScrollView>
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
    profileImage: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderColor: '#2e2e2e',
        marginBottom: 20,
    },
    profileView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin: 30,
    },
    username: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    button: {
        backgroundColor: '#2e2e2e',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imagePick: {
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
});
