import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import your components
import Welcome from './Welcome';
import HomeScreen from './CustomerComponents/Home';
import ProfileScreen from './CustomerComponents/MyBookings';
import GuestPage from './CustomerComponents/GuestPage';
import GuestPageBarber from './HairdresserComponents/GuestPage';
import BarbersScreen from './CustomerComponents/AvailableSlots/AvailableSlots';
import SettingsScreen from './CustomerComponents/MyProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfLDuG705wSNAczHLmLrbgeruRxMSA8RI",
  authDomain: "test-app-a3a23.firebaseapp.com",
  projectId: "test-app-a3a23",
  storageBucket: "test-app-a3a23.appspot.com",
  messagingSenderId: "333240936477",
  appId: "1:333240936477:web:7007c2a3f998eab5d57ef4"
};

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
    console.log(user)
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ loggedIn: true, user: user });
      } else {
        setUser({ loggedIn: false });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const Frontpage = () => {
    return (
      <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Guest" component={GuestPage} />
          <Stack.Screen name="GuestBarber" component={GuestPageBarber} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  const Navigation = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "pink",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              {
                display: "flex"
              },
              null
            ],
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Hjem') {
                return (
                  <Ionicons
                    name={'home-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Min profil') {
                return (
                  <Ionicons
                    name='md-settings-outline'
                    size={size}
                    color={color}
                  />
                );
              } else {
                return (
                  <Ionicons
                    name='md-list-outline'
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
        >
          <Tab.Screen name="Hjem" children={() => <HomeScreen  />} />
          <Tab.Screen name="Ledige tider" children={() => <BarbersScreen />} />
          <Tab.Screen name="Mine tider" children={() => <ProfileScreen />} />
          <Tab.Screen name="Min profil" children={() => <SettingsScreen  />} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return user.loggedIn ? <Navigation /> : <Frontpage />;

}

