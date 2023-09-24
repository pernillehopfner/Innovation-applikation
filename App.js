import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Importere Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

//Importere vores componenter fra components mappe
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import BarbersScreen from './components/Barbers/index';

import ListComponent from './components/List/index.js';


import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from "./components/StackNavigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Her oprettes en instans af tabnavigator.
const Tab = createBottomTabNavigator();

//Her oprettes de tre tekst referencer, der skal benyttes i vores screen komponenter
const homeScreenText = "Dette er HomeScreen!"
const settingsScreenText = "Dette er SettingsScreen!"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfLDuG705wSNAczHLmLrbgeruRxMSA8RI",
  authDomain: "test-app-a3a23.firebaseapp.com",
  projectId: "test-app-a3a23",
  storageBucket: "test-app-a3a23.appspot.com",
  messagingSenderId: "333240936477",
  appId: "1:333240936477:web:7007c2a3f998eab5d57ef4"
};

// Initialize Firebase

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
    // Initialize other firebase products here
  } else {
    console.log("Firebase not on!");
  }
 
  const auth = getAuth();

  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        callback({loggedIn: true, user: user});
        console.log("You are logged in!");
        // ...
      } else {
        // User is signed out
        // ...
        callback({loggedIn: false});
      }
    });
  }

 //Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Opret eller Login med din firebase Email
          </Text>
          
          <Card style={{padding:20, margin: 20}}>
            <SignUpForm />
          </Card>
          
          <Card style={{padding:20, margin: 20}}>
            <LoginForm />
          </Card>

        </View>
    )
  }

  const Navigation = () => {
    return  (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
        {
          display: "flex"
        },
          null
          ],
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return (
                  <Ionicons
                      name={'home-outline'}
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Settings') {
              return (
                  <Ionicons
                      name='md-settings-outline'
                      size={size}
                      color={color}
                  />
              );
            }
            else{
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
          <Tab.Screen name="Profile" children={()=><ProfileScreen/>} />
          <Tab.Screen name="Settings" children={()=><SettingsScreen prop={settingsScreenText}/>} />
          <Tab.Screen name="Home" children={()=><HomeScreen prop={homeScreenText}/>} />
          <Tab.Screen name="List" children={()=><ListComponent/>} />
          <Tab.Screen name="Frisører" children={()=><BarbersScreen/>} />
          <Tab.Screen name="Stack" component={StackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
  )
  }




  return user.loggedIn ? <Navigation /> : <GuestPage/> ;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
