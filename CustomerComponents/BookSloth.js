
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
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
            loadedBookings.push({
              id: key,
              ...appointment,
              booked: appointment.bookedBy ? true : false,
            });
          }
        }
    
        setBookings(loadedBookings);
      });
    }, [db]);
  
    const handleBooking = (bookingId) => {
      if (!user) {
        alert('Du skal være logget ind for at booke en tid.');
        return;
      }
  
      const bookingToUpdate = {};
      bookingToUpdate[`appointments/${user.uid}/${bookingId}/bookedBy`] = user.uid;
  
      update(ref(db), bookingToUpdate)
        .then(() => {
          setBookings(prevBookings => prevBookings.map(booking => {
            if (booking.id === bookingId) {
              return { ...booking, booked: true };
            }
            return booking;
          }));
          alert('Tiden er blevet booket.');
        })
        .catch(error => {
          alert('Der opstod en fejl: ' + error.message);
        });
    };
  
    return (
      <ScrollView style={styles.container}>
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingItem}>
            <Text style={styles.text}>Tidspunkt: {booking.date}</Text>
            <Text style={styles.text}>Behandlingstype: {booking.treatmentType}</Text>
            <Text style={styles.text}>Før-pris: {booking.originalPrice}</Text>
            <Text style={styles.text}>Ny pris: {booking.discountedPrice}</Text>
            <Text style={styles.text}>Behandler: {booking.handler}</Text>
            {!booking.booked && (
              <TouchableOpacity onPress={() => handleBooking(booking.id)}>
                <Text style={styles.bookButton}>Book nu</Text>
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
      position: 'relative', // for absolute positioning of the booked tag
    },
    text: {
      fontSize: 16,
      marginBottom: 4,
    },
    bookButton: {
      marginTop: 10,
      color: 'blue',
      fontWeight: 'bold',
    },
    bookedTag: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
    },
    bookedText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  
export default BookSloth;
