import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

function ProfileScreen() {
  const [futureAppointments, setFutureAppointments] = useState([
    {
      datetime: '21/10 kl 12:00',
      clinic: 'Salon A',
      treatment: 'Klip 1 time',
      price: 200,
    },
    {
      datetime: '22/10 kl 14:30',
      clinic: 'Salon B',
      treatment: 'Farvning 3 timer',
      price: 350,
    },
  ]);

  const [pastAppointments, setPastAppointments] = useState([
    {
      datetime: '15/10 kl 10:00',
      clinic: 'Salon C',
      treatment: 'Vask og føn 30 min',
      price: 100,
    },
  ]);

  const calculateTotalSavings = () => {
    // Beregn det samlede beløb, der er sparet på behandlinger
    const allAppointments = [...futureAppointments, ...pastAppointments];

    let totalSavings = 0;

    allAppointments.forEach((appointment) => {
      if (appointment.price) {
        totalSavings += appointment.price;
      }
    });

    return totalSavings;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Kommende tider:</Text>
        {futureAppointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <Text style={styles.appointmentHeader}>
              Tidspunkt: {appointment.datetime}
            </Text>
            <Text style={styles.appointmentText}>
              Klinik: {appointment.clinic}
            </Text>
            <Text style={styles.appointmentText}>
              Behandlingstype: {appointment.treatment}
            </Text>
            <Text style={styles.appointmentText}>
              Pris: {appointment.price} kr
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                // Handling for "Se detaljer" knappen
              }}
            >
              <Text style={styles.detailsButtonText}>Se detaljer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Tidligere bookede tider:</Text>
        {pastAppointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <Text style={styles.appointmentHeader}>
              Tidspunkt: {appointment.datetime}
            </Text>
            <Text style={styles.appointmentText}>
              Klinik: {appointment.clinic}
            </Text>
            <Text style={styles.appointmentText}>
              Behandlingstype: {appointment.treatment}
            </Text>
            <Text style={styles.appointmentText}>
              Pris: {appointment.price} kr
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                // Handling for "Se detaljer" knappen
              }}
            >
              <Text style={styles.detailsButtonText}>Se detaljer</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.savingsSection}>
        <Text style={styles.savingsHeader}>Sparet beløb på behandlinger:</Text>
        <Text style={styles.totalSavings}>{calculateTotalSavings()} kr</Text>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#E1F5FF', // Baggrundsfarve
  },
  section: {
    marginBottom: 16,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFCBF1', // Lyserød overskrift
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Bold', // Brug IBM Plex Mono som teksttype
  },
  appointmentItem: {
    backgroundColor: 'white', // Hvid boks omkring tiden
    borderRadius: 5,
    padding: 16,
    marginBottom: 16, // Øget margin for at adskille tider
  },
  appointmentHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A', // Sort farve for tekst i boksen
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Regular', // Brug IBM Plex Mono som teksttype
  },
  appointmentText: {
    fontSize: 16,
    color: 'black', // Sort farve for tekst i boksen
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Regular', // Brug IBM Plex Mono som teksttype
  },
  detailsButton: {
    backgroundColor: '#FFCBF1', // Lyserød boks omkring knappen
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center', // Placer knappen til venstre i boksen
  },
  detailsButtonText: {
    color: 'black', // Sort tekstfarve for knappen
  },
  savingsSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  savingsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFCBF1', // Lyserød overskrift
    marginBottom: 16,
    // fontFamily: 'IBMPlexMono-Bold', // Brug IBM Plex Mono som teksttype
  },
  totalSavings: {
    fontSize: 24,
    color: 'green', // Tekstfarve for sparebeløb (grøn)
    // fontFamily: 'IBMPlexMono-Bold', // Brug IBM Plex Mono som teksttype
  },
});
