import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ListingsScreen from './src/screens/listings/ListingsScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#d4af37',
        tabBarInactiveTintColor: '#999',
        headerStyle: {
          backgroundColor: '#0a0e27',
          borderBottomColor: '#d4af37',
          borderBottomWidth: 2
        },
        headerTintColor: '#ffd700',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Tab.Screen 
        name="Listings" 
        component={ListingsScreen}
        options={{
          title: '🏠 Properties',
          tabBarLabel: 'Properties'
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          title: '🔍 Search',
          tabBarLabel: 'Search'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: '👤 Profile',
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator({ isLoggedIn }) {
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Provider store={store}>
      <RootNavigator isLoggedIn={isLoggedIn} />
    </Provider>
  );
}

export default App;