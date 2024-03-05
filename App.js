import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Home from './pages/Home';
import Search from './pages/Search';
import Teams from './pages/Teams';
import Settings from './pages/Settings';
import Detail from './pages/Detail';
import Camera from './pages/Camera';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

// Écran pour le Tab Navigator
function TabNavigatorScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Teams" component={TeamsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

// Stack Navigator principal incluant le Tab Navigator et la page Detail
export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Text style={styles.title}>Pokedex</Text>
                <Stack.Navigator>
                    <Stack.Screen name="Tabs" component={TabNavigatorScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Detail" component={Detail} />
                    <Stack.Screen name="Camera" component={Camera} />
                </Stack.Navigator>
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
