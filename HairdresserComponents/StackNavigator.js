import * as React from "react";
import { createStackNavigator } from '@react-navigation/stack';

// Her instantieres en StackNavigator.
const Stack = createStackNavigator()

/*
* I return() placeres en Stack.Navigator komponent, som i 'initialRouteName' henviser til DetailsScreen.
* Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
* Hver Screen har individuel Styling qf den fremviste header.
 */
function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        >
            <Stack.Screen 
                name="Details" 
                component={DetailsScreen} // Komponentet for ''min profil" skærmen
                options={{
                    headerTitleAlign: 'center', // Justerer header titlen til midten
                    headerTitleStyle: { color: 'white' }, // Styling for header titlen
                    headerStyle: { backgroundColor: '#ba6262' } // Styling for headeren
                }}
            />
             <Stack.Screen 
                name="ScreenOne" 
                component={ScreenOne} // Komponentet for "ScreenOne" skærmen
                options={{
                    headerTitleStyle: { textAlign: 'right', color: 'white' }, // Styling for header titlen
                    headerStyle: { backgroundColor: '#62bab5' } // Styling for headeren
                }} 
            />
            { <Stack.Screen 
                name="ScreenTwo" 
                component={ScreenTwo} // Komponentet for "ScreenTwo" skærmen
                options={{
                    headerTitleStyle: { color: 'black' }, // Styling for header titlen
                    headerStyle: { backgroundColor: '#628bba' } // Styling af headeren
                }}
            /> }
        </Stack.Navigator>
    )
}

//Eksport af den funktionelle komponent, så den kan importeres i andre komponenter
export default StackNavigator;
