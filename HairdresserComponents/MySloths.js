import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Alert } from 'react-native';
import { getDatabase, ref, onValue, remove } from "firebase/database";

function MySloth() {
  const [bookings, setBookings] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const appointmentsRef = ref(db, 'appointments');
    
    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      
      const data = snapshot.val();
          
      const bookingsArray = data ? Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      })) : [];

      let transformedArray = bookingsArray.map(item => {
        const keys = Object.keys(item)
  
        
        return item[keys[1]];
    });
    
      
      setBookings(transformedArray);
    }, (error) => {
      Alert.alert("Error", "Der opstod en fejl ved indlæsning af tider.");
      console.error("Error fetching data:", error);
    });

    return () => unsubscribe();
  }, []);

  

  console.log(bookings)
  return (
    <ScrollView style={styles.container}>
      {bookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <Text style={styles.text}>Tidspunkt: {booking.date}</Text>
          <Text style={styles.text}>Behandlingstype: {booking.treatmentType}</Text>
          <Text style={styles.text}>Før-pris: {booking.originalPrice}</Text>
          <Text style={styles.text}>Ny pris: {booking.discountedPrice}</Text>
          <Text style={styles.text}>Behandler: {booking.handler}</Text>
          <Text style={styles.text}>Telefonnummer: {booking.phoneNumber}</Text>

        </View>
      ))}
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
  },
  // Tilføj yderligere styles her...
});

export default MySloth;
