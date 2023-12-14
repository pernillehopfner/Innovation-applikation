import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const bookingsRef = ref(db, 'appointments');

    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const bookingsData = snapshot.val();
      const loadedBookings = [];

      // Gennemgå det første niveau af nøgler
      for (const outerKey in bookingsData) {
        // Gennemgå det andet niveau af nøgler
        for (const key in bookingsData[outerKey]) {
          loadedBookings.push({
            id: key,
            date: bookingsData[outerKey][key].date,
            treatmentType: bookingsData[outerKey][key].treatmentType,
            originalPrice: bookingsData[outerKey][key].originalPrice,
            discountedPrice: bookingsData[outerKey][key].discountedPrice,
            handler: bookingsData[outerKey][key].handler,
          });
        }
      }
      setBookings(loadedBookings);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingItem}>
            <Text style={styles.text}>Tidspunkt: {booking.date}</Text>
            <Text style={styles.text}>Behandlingstype: {booking.treatmentType}</Text>
            <Text style={styles.text}>Før-pris: {booking.originalPrice}</Text>
            <Text style={styles.text}>Ny pris: {booking.discountedPrice}</Text>
            <Text style={styles.text}>Behandler: {booking.handler}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.text}>Ingen bookinger fundet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookingItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  }
});

export default MyBookings;
