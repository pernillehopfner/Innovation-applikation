import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, View } from 'react-native';
import ArrayListComponent from './ArrayListComponent';
import FetchListComponent from './FetchListComponent';
import FlatListComponent from './FlatListComponent';
import { CARS, COUNTRIES } from './const'; // Importer CARS og COUNTRIES fra const.js

const List = () => {
return ( <View style={styles.container}>
    <StatusBar style="auto" />
    {/* ArrayListComponent */}
    <ArrayListComponent cars={CARS} countries={COUNTRIES} />
    {/* FetchListComponent */}
    <FetchListComponent cars={CARS} countries={COUNTRIES} />
    {/* FlatListComponent */}
    <FlatListComponent cars={CARS} countries={COUNTRIES} />
  </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFC0CB',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default List