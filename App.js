import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Home from './pages/Home';
import Search from './pages/Search';
import Teams from './pages/Teams';
import Settings from './pages/Settings';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Home />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

function SearchScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Search />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

function TeamsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Teams />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

function SettingsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Settings />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Pokedex</Text>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name='Home' component={HomeScreen} />
                    <Tab.Screen name='Search' component={SearchScreen} />
                    <Tab.Screen name='Teams' component={TeamsScreen} />
                    <Tab.Screen name='Settings' component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
});
