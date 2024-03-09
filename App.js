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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'red',
            }}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="magnifying-glass" size={size} color={color} />
                    ),
                }}
                name="Search"
                component={SearchScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Teams',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="team" size={size} color={color} />
                    ),
                }}
                name="Teams"
                component={TeamsScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Teams',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
                name="Settings"
                component={SettingsScreen}
            />
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
                    <Stack.Screen
                        options={({ navigation }) => ({
                            headerLeft: () => (
                                <Ionicons
                                name="chevron-back"
                                size={32}
                                color="red"
                                onPress={() => navigation.goBack()}
                                style={{ marginLeft: -15 }}
                                />
                            ),
                        })}
                        name="Detail"
                        component={Detail}
                    />
                    <Stack.Screen
                        options={({ navigation }) => ({
                            headerLeft: () => (
                                <Ionicons
                                name="chevron-back"
                                size={32}
                                color="red"
                                onPress={() => navigation.goBack()}
                                style={{ marginLeft: -15 }}
                                />
                            ),
                        })}
                        name="Camera"
                        component={Camera}
                    />
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
