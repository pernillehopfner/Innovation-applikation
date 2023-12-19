import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

function MySlots() {
  const [mySlots, setMySlots] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      // Brugeren er ikke logget ind, eller så er data endnu ikke tilgængelig
      return;
    }

    const db = getDatabase();
    const mySlotsRef = ref(db, `userBookedTimes/${user.uid}`);

    const unsubscribe = onValue(mySlotsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSlots = data ? Object.keys(data).map(key => {
        return { key, ...data[key] };
      }) : [];
      setMySlots(loadedSlots);
    });

    return () => unsubscribe(); // Husk at afmelde lytteren
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      {mySlots.map((slot) => (
        <View key={slot.key} style={styles.slotItem}>
          <Text style={styles.text}>Tidspunkt: {slot.date}</Text>
          <Text style={styles.text}>Behandlingstype: {slot.treatmentType}</Text>
          <Text style={styles.text}>Pris: {slot.discountedPrice}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slotItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MySlots;
