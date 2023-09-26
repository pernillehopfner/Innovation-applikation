import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

function ProfileScreen() {
  // State variabler til at holde styr på fremtidige og tidligere aftaler
  const [futureAppointments, setFutureAppointments] = useState([
    // Fremtidige aftaler
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
    // Tidligere aftaler
    {
      datetime: '15/10 kl 10:00',
      clinic: 'Salon C',
      treatment: 'Vask og føn 30 min',
      price: 100,
    },
  ]);

  // Funktion til at beregne det samlede beløb, som kunden har sparet på tidligere og kommende behandlinger 
  const calculateTotalSavings = () => {
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
      {/* Overskrift for sektion med kommende tider */}
      <View style={styles.section}>
        <Text style={styles.header}>Kommende tider:</Text>
        {/* Liste over fremtidige aftaler */}
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

      {/* Overskrift for sektion med tidligere tider */}
      <View style={styles.section}>
        <Text style={styles.header}>Tidligere bookede tider:</Text>

        {/* Liste over tidligere aftaler */}
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

      {/* Sektion til at vise det samlede beløb, der er sparet */}
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
  },
  appointmentItem: {
    backgroundColor: 'white', // Hvid boks omkring tiden
    borderRadius: 5,
    padding: 16,
    marginBottom: 16, 
  },
  appointmentHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A', 
    marginBottom: 8,
  },
  appointmentText: {
    fontSize: 16,
    color: 'black', 
    marginBottom: 8,
  },
  detailsButton: {
    backgroundColor: '#FFCBF1', // Lyserød boks omkring knappen
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center', // Placer knappen til venstre i boksen
  },
  detailsButtonText: {
    color: 'black', 
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
  },
  totalSavings: {
    fontSize: 24,
    color: 'green', // Tekstfarve for sparetbeløb
  },
});

