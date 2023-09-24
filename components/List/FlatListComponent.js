import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CARS } from '../const';

// const CarItem = ({ item }) => {
//   return (
//     <Text>{item}</Text>
//   );
// };

const FlatListComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mine biler</Text>
      <ScrollView style={styles.scrollView}>
        {CARS.map((car, index) => (
          <Text key={index}>{car}</Text>
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
    paddingTop: 5,
  },
  scrollView: {
    height: 80, // Ensartet højde for ScrollView
  },
});

export default FlatListComponent;
