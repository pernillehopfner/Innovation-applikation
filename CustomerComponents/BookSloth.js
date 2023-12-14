// CustomerComponents/BookSlots.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, remove } from "firebase/database";

function BookSloth({ user }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const slotsRef = ref(db, 'ledigeTider');

    const unsubscribe = onValue(slotsRef, (snapshot) => {
      const slotsData = snapshot.val();
      const loadedSlots = slotsData ? Object.keys(slotsData).map(key => ({ key, ...slotsData[key] })) : [];
      setSlots(loadedSlots);
    });

    return () => unsubscribe();
  }, []);

  const bookSlot = (slot) => {
    const db = getDatabase();
    // Fjern den ledige tid fra 'ledigeTider'
    remove(ref(db, `ledigeTider/${slot.key}`));

    // Tilføj den bookede tid til 'bookedeTider' under kundens ID
    const userBookedSlotsRef = ref(db, `kundeBookedeTider/${user.uid}`);
    push(userBookedSlotsRef, slot);
  };

  return (
    <ScrollView style={styles.container}>
      {slots.map((slot) => (
        <TouchableOpacity key={slot.key} style={styles.slotItem} onPress={() => bookSlot(slot)}>
          <Text style={styles.text}>Tidspunkt: {slot.date}</Text>
          <Text style={styles.text}>Behandlingstype: {slot.treatmentType}</Text>
          <Text style={styles.text}>Pris: {slot.discountedPrice}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Dine styles her...
});

export default BookSloth;
