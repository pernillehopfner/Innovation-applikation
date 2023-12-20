import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
// Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

//Frisør komponents 
import HomeScreen from './HairdresserComponents/Home';
import MySloth from './HairdresserComponents/MySloths';
import ProfileScreen from './HairdresserComponents/MyProfile';
import GuestPageBarber from './HairdresserComponents/GuestBarber';


//Kunde komppnents
import GuestPage from './CustomerComponents/GuestCustomer';
import MySlots from './CustomerComponents/MySlots';
import BookSloth from './CustomerComponents/BookSloth';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmby88onizVXw-q0j05Y2R_TItm-P92mo",
  authDomain: "trimsterapp.firebaseapp.com",
  databaseURL: "https://trimsterapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trimsterapp",
  storageBucket: "trimsterapp.appspot.com",
  messagingSenderId: "273357299684",
  appId: "1:273357299684:web:db8dfeabb0535a73fa31f1"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [type, setType] = useState("customer")
  const changeType = (t) => {
    setType(t)
  }


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


  const Welcome = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Velkommen til Trimster</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffc0ff' }]}
          onPress={() => {
            changeType("barber");
            navigation.navigate('GuestBarber');
          }}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>Jeg er frisør</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffc0ff', marginTop: 10 }]}
          onPress={() => {
            changeType("customer");
            navigation.navigate('Guest');
          }}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>Jeg er kunde</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      borderWidth: 2,
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'normal', // Ikke-fed tekst
    },
  });
  

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

//------------------Frisørnavigation og views---------------------------//

  const BarberNavigation = () => {
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
          <Tab.Screen name="Mine tider" children={() => <MySloth />} />
          <Tab.Screen name="Min profil" children={() => <ProfileScreen  />} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

//------------------Kundenavigation og views---------------------------//

  const CustomerNavigation = () => {
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
          <Tab.Screen name="Book tid" children={() => <BookSloth  />} />
          <Tab.Screen name="Mine profil" children={() => <MySlots  />} />
          

        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return user.loggedIn ? type === "customer" ? <CustomerNavigation/> : <BarberNavigation /> : <Frontpage />;

}

