import { StyleSheet, Text, SafeAreaView } from 'react-native';
import getPokemonsFromApi from '../api/api';
import { useEffect, useState } from 'react';
import PokeCard from '../components/PokeCard';

export default function App() {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Settings</Text>
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
