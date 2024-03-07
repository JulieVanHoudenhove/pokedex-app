import { StyleSheet, Text, SafeAreaView, Button, Image } from 'react-native';
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
            <Text>Settings</Text>
            <Button title="Open camera" onPress={pickImage} />
            <Button title="Pick an image from camera roll" onPress={openCamera} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
