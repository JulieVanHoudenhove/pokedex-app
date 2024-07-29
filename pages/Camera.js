import {CameraView, Camera} from "expo-camera";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';

export default function CameraComponent() {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const navigation = useNavigation();
    const [facing, setFacing] = useState('back');
    
    const toggleCameraFacing = async () => {
        console.log(facing)
        setFacing((current) => (current === 'back' ? 'front' : 'back'))
    }

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
        if (cameraRef) {
            // console.log(cameraRef)
            const photo = await cameraRef.takePictureAsync();
            console.log(photo)

            if (photo.uri === undefined) {
                return;
            }
            
            try {
                await MediaLibrary.saveToLibraryAsync(photo.uri);
            } catch (error) {
                console.error(error);
            }

            navigation.navigate('Settings');
        }
    };

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={(ref) => setCameraRef(ref)}>
                <View style={styles.containerFlip}>
                    <TouchableOpacity style={styles.buttonFlip} onPress={toggleCameraFacing}>
                        <MaterialIcons name="flip-camera-ios" size={32} color="#FFF2C5" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={takePicture} >
                        <MaterialIcons name="radio-button-on" size={60} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 125,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    containerFlip: {
        height: '50%',
        width: '100%',
        flex: 1,
        alignItems: 'flex-end'
    },
    containerButton: {
        height: '50%',
        flex: 1,
        justifyContent: 'flex-end'
    }
})