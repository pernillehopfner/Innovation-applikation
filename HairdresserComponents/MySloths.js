import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TextInput, Button } from 'react-native';
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";

function MySloth() {
  const [bookings, setBookings] = useState([]);
  const auth = getAuth();
  const db = getDatabase();
  const [editingId, setEditingId] = useState(null);
  const [editedBooking, setEditedBooking] = useState({});



  useEffect(() => {
    const appointmentsRef = ref(db, 'appointments');
    
    onValue(appointmentsRef, (snapshot) => {
      const appointmentsData = snapshot.val();
      console.log('Fetched Data:', appointmentsData); // Log the fetched data to debug
      if (appointmentsData) {
        const loadedBookings = Object.keys(appointmentsData).map(key => {
          const item = appointmentsData[key];
          return {
            id: key,
            date: item.date, // Removed default empty string
            treatmentType: item.treatmentType,
            originalPrice: item.originalPrice,
            discountedPrice: item.discountedPrice,
            handler: item.handler
          };
        });
        setBookings(loadedBookings);
      } else {
        setBookings([]); // Still clear bookings if there is no data
      }
    });
  }, [db]);
  


  const startEditing = (booking) => {
    setEditingId(booking.id);
    // Sæt standardværdier for alle felter for at undgå undefined fejl
    setEditedBooking({
      date: booking.date || '',
      treatmentType: booking.treatmentType || '',
      originalPrice: booking.originalPrice ? booking.originalPrice.toString() : '0',
      discountedPrice: booking.discountedPrice ? booking.discountedPrice.toString() : '0',
      handler: booking.handler || ''
    });
  };
  
  const handleEditChange = (name, value) => {
    setEditedBooking(prev => ({ ...prev, [name]: value }));
  };

  const saveBooking = () => {
    const appointmentRef = ref(db, `appointments/${editingId}`);
    update(appointmentRef, editedBooking)
      .then(() => {
        setBookings(currentBookings =>
          currentBookings.map(booking => 
            booking.id === editingId ? { ...booking, ...editedBooking } : booking
          )
        );
        setEditingId(null);
        Alert.alert("Succes", "Booking opdateret.");
      }).catch(error => {
        console.error("Opdateringsfejl: ", error);
        Alert.alert("Fejl", "Der opstod en fejl ved opdatering.");
      });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Bekræft sletning",
      "Er du sikker på at du vil slette denne tid?",
      [
        { text: "Annuller", style: "cancel" },
        { text: "Slet", onPress: () => deleteAppointment(id) }
      ]
    );
  };

  const deleteAppointment = (id) => {
    const appointmentRef = ref(db, `appointments/${id}`);
    remove(appointmentRef)
      .then(() => {
        setBookings(currentBookings => currentBookings.filter(booking => booking.id !== id));
        Alert.alert("Slettet!", "Din tid er blevet slettet.");
      }).catch(error => {
        console.error("Fejl ved sletning: ", error);
        Alert.alert("Fejl!", "Der opstod en fejl ved sletning af tiden.");
      });
  };

  return (
    <ScrollView style={styles.container}>
      {bookings.map((booking) => (
        <View key={booking.id} style={styles.bookingItem}>
        {editingId === booking.id ? (
            <>
              <TextInput
                value={editedBooking.date}
                onChangeText={(text) => handleEditChange('date', text)}
                style={styles.input}
              />
              <TextInput
                value={editedBooking.treatmentType}
                onChangeText={(text) => handleEditChange('treatmentType', text)}
                style={styles.input}
              />
              <TextInput
                value={editedBooking.originalPrice.toString()}
                onChangeText={(text) => handleEditChange('originalPrice', text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <TextInput
                value={editedBooking.discountedPrice.toString()}
                onChangeText={(text) => handleEditChange('discountedPrice', text)}
                style={styles.input}
                keyboardType="numeric"
              />
              <TextInput
                value={editedBooking.handler}
                onChangeText={(text) => handleEditChange('handler', text)}
                style={styles.input}
              />
              <Button title="Gem" onPress={saveBooking} />
            </>
          ) : (
            <>
            
 <Text style={styles.text}>Tidspunkt: {booking.date}</Text>
        <Text style={styles.text}>Behandlingstype: {booking.treatmentType}</Text>
        <Text style={styles.text}>Før-pris: {booking.originalPrice}</Text>
        <Text style={styles.text}>Ny pris: {booking.discountedPrice}</Text>
        <Text style={styles.text}>Behandler: {booking.handler}</Text>
        <Button title="Rediger" onPress={() => startEditing(booking)} />
        <Button title="Slet" onPress={() => handleDelete(booking.id)} color="red" />
      </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... eksisterende styles ...
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: '#0000ff',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDelete: {
    backgroundColor: '#ff0000',
  },
  //
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

export default MySloth;
