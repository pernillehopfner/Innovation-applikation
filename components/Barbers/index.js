import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as React from 'react';

function HomeScreen({ prop }) {
  const availableAppointments = [
    {
      salonName: 'Salon A',
      appointmentType: 'Klip 1 time',
      originalPrice: 300,
      discountedPrice: 180,
    },
    {
      salonName: 'Salon B',
      appointmentType: 'Farvning 3 timer',
      originalPrice: 600,
      discountedPrice: 360,
    },
    {
      salonName: 'Salon C',
      appointmentType: 'Vask og føn 30 min',
      originalPrice: 100,
      discountedPrice: 60,
    },
    {
      salonName: 'Salon D',
      appointmentType: 'Klip 1 time',
      originalPrice: 250,
      discountedPrice: 150,
    },
    {
      salonName: 'Salon E',
      appointmentType: 'Farvning 3 timer',
      originalPrice: 550,
      discountedPrice: 330,
    },
    {
      salonName: 'Salon F',
      appointmentType: 'Vask og føn 30 min',
      originalPrice: 90,
      discountedPrice: 54,
    },
    {
      salonName: 'Salon G',
      appointmentType: 'Klip 1 time',
      originalPrice: 280,
      discountedPrice: 168,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Frisører</Text>
      <Text style={styles.subHeader}>Ledige tider i dit område:</Text>
      {availableAppointments.map((appointment, index) => (
        <View key={index} style={styles.appointmentItem}>
          <View style={styles.salonBox}>
            <Text style={styles.salonText}>{appointment.salonName}</Text>
            <Text style={styles.appointmentText}>
              Du kan få "{appointment.appointmentType}"
            </Text>
            <Text style={styles.originalPrice}>Før: {appointment.originalPrice} kr</Text>
            <View style={styles.discountedPriceBox}>
              <Text style={styles.discountedPriceLabel}>Nu:</Text>
              <Text style={styles.discountedPrice}>{appointment.discountedPrice} kr</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book tid</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1F5FF', // Baggrundsfarve
  },
  header: {
    fontSize: 24,
    color: '#1A1A1A', // Tekstfarve
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    color: '#1A1A1A', // Tekstfarve
    marginBottom: 8,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  salonBox: {
    backgroundColor: 'white', // Baggrundsfarve for boksen omkring frisør
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  salonText: {
    fontSize: 16,
    color: '#1A1A1A', // Tekstfarve
    fontWeight: 'bold', // Fed skrift
    marginBottom: 8,
  },
  appointmentText: {
    fontSize: 16,
    color: '#1A1A1A', // Tekstfarve
    textAlign: 'center', // Centrer teksten
  },
  originalPrice: {
    fontSize: 14,
    color: 'red', // Tekstfarve for oprindelig pris (streget over)
    textDecorationLine: 'line-through', // Streg over teksten
    textAlign: 'center', // Centrer teksten
  },
  discountedPriceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  discountedPriceLabel: {
    fontSize: 16,
    color: '#1A1A1A', // Tekstfarve
    marginRight: 4,
  },
  discountedPrice: {
    fontSize: 20, // Større skrift for nedsat pris
    color: '#FFCBF1', // Tekstfarve for nedsat pris
  },
  bookButton: {
    backgroundColor: '#FFCBF1', // Baggrundsfarve for knap
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    width: '30%', // Juster bredden af knappen
    alignItems: 'center', // Centrer indholdet af knappen
  },
  bookButtonText: {
    fontSize: 16,
    color: 'black', // Tekstfarve for knapteksten
  },
});
