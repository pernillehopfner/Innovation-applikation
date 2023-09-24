import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COUNTRIES } from '../const';

const ArrayListComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lande</Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true} // Tilføj denne attribut for at vise scrollbar
      >
        {COUNTRIES.map((country, index) => (
          <Text key={index}>{country}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  scrollView: {
    height: 80,
  },
});

export default ArrayListComponent;




