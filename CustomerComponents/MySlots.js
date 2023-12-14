// CustomerComponents/MySlots.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

function MySlots({ user }) {
  const [bookedSlots, setBookedSlots] = useState([]);



  return (
    <ScrollView style={styles.container}>
      {bookedSlots.map((slot) => (
        <View key={slot.key} style={styles.bookedSlotItem}>
          <Text style={styles.text}>Tidspunkt: {slot.date}</Text>
          <Text style={styles.text}>Behandlingstype: {slot.treatmentType}</Text>
          <Text style={styles.text}>Pris: {slot.discountedPrice}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Dine styles her...
});

export default MySlots;
