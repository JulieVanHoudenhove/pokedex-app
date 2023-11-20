import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';
import CustomButton from './Components/Button';

export default function App() {

    const [text, setText] = useState("rien");

    const changeText = (newText) => {
        setText(newText);
    }

    return (
        <View style={styles.container}>
            <Text>j'ai cliqué sur {text}</Text>
            <CustomButton
                text={'noir'}
                changeText={changeText}
                color={'#000000'}
            />
            <CustomButton
                text={'bleu'}
                changeText={changeText}
                color={'blue'}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
