import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Linking } from 'react-native';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

function BookSloth() {
  const [bookings, setBookings] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  useEffect(() => {
    const appointmentsRef = ref(db, 'appointments');

    onValue(appointmentsRef, (snapshot) => {
      const appointmentsData = snapshot.val() || {};
      const loadedBookings = [];
      
      for (const outerKey in appointmentsData) {
        for (const key in appointmentsData[outerKey]) {
          const appointment = appointmentsData[outerKey][key];
          if (appointment.bookedBy === user.uid) {
            continue;
          }
          loadedBookings.push({
            id: key,
            ...appointment,
            booked: appointment.bookedBy ? true : false,
          });
        }
      }
  
      setBookings(loadedBookings);
    });
  }, [user, db]);

  const handleBooking = (bookingId, phoneNumber) => {
    if (!user) {
      alert('Du skal være logget ind for at booke en tid.');
      return;
    }

    const bookingToUpdate = {};
    bookingToUpdate[`appointments/${user.uid}/${bookingId}/bookedBy`] = user.uid;

    update(ref(db), bookingToUpdate)
      .then(() => {
        Linking.openURL(`tel:${phoneNumber}`);
      })
      .catch(error => {
        alert('Der opstod en fejl: ' + error.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      {bookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
          <Text style={styles.headerText}>Tidspunkt:</Text>
          <Text style={styles.text}>{booking.date}</Text>
          <Text style={styles.headerText}>Behandlingstype:</Text>
          <Text style={styles.text}>{booking.treatmentType}</Text>
          <Text style={styles.headerText}>Før-pris:</Text>
          <Text style={styles.text}>{booking.originalPrice}</Text>
          <Text style={styles.headerText}>Ny pris:</Text>
          <Text style={styles.text}>{booking.discountedPrice}</Text>
          <Text style={styles.headerText}>Behandler:</Text>
          <Text style={styles.text}>{booking.handler}</Text>
          <Text style={styles.headerText}>Telefonnummer:</Text>
          <Text style={styles.text}>{booking.phoneNumber}</Text>
          {!booking.booked && (
            <TouchableOpacity onPress={() => handleBooking(booking.id, booking.phoneNumber)} style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book tid</Text>
            </TouchableOpacity>
          )}
          {booking.booked && (
            <View style={styles.bookedTag}>
              <Text style={styles.bookedText}>Booket</Text>
            </View>
          )}
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
    position: 'relative',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#ffc0ff',
    padding: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookSloth;
