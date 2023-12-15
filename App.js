import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import Home from './pages/Home';

export default function App() {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Pokedex</Text>
            <Home />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
