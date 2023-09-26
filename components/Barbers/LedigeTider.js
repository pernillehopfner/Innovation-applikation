import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function HomeScreen({ navigation }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  // Tilgængelige frisørtider
  const availableAppointments = [
    {
      salonName: 'Salon A',
      region: 'København',
      treatmentType: 'Klip',
      appointmentType: 'Klip 1 time',
      originalPrice: 300,
      discountedPrice: 180,
      date: '21/10',
      time: '12:00',
    },
    {
      salonName: 'Salon B',
      region: 'Jylland',
      treatmentType: 'Farvning',
      appointmentType: 'Farvning 3 timer',
      originalPrice: 600,
      discountedPrice: 360,
      date: '22/10',
      time: '14:00',
    },
    {
      salonName: 'Salon C',
      region: 'Fyn',
      treatmentType: 'Vask og føn',
      appointmentType: 'Vask og føn 30 min',
      originalPrice: 100,
      discountedPrice: 60,
      date: '23/10',
      time: '15:30',
    },
    {
      salonName: 'Salon D',
      region: 'København',
      treatmentType: 'Klip',
      appointmentType: 'Klip 1 time',
      originalPrice: 250,
      discountedPrice: 150,
      date: '24/10',
      time: '10:00',
    },
    {
      salonName: 'Salon E',
      region: 'Jylland',
      treatmentType: 'Farvning',
      appointmentType: 'Farvning 3 timer',
      originalPrice: 550,
      discountedPrice: 330,
      date: '25/10',
      time: '11:30',
    },
    {
      salonName: 'Salon F',
      region: 'Fyn',
      treatmentType: 'Vask og føn',
      appointmentType: 'Vask og føn 30 min',
      originalPrice: 90,
      discountedPrice: 54,
      date: '26/10',
      time: '13:15',
    },
    {
      salonName: 'Salon G',
      region: 'København',
      treatmentType: 'Klip',
      appointmentType: 'Klip 1 time',
      originalPrice: 280,
      discountedPrice: 168,
      date: '27/10',
      time: '16:45',
    },
  ];

  // Tilgængelige regioner og behandlingstyper
  const regions = [
    'København',
    'Jylland',
    'Fyn',
  ];

  // Typer af behandlinger
  const treatments = [
    'Klip',
    'Vask og føn',
    'Farvning',
  ];
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Velkomsttekst */}
      <Text style={styles.header}>Velkommen til Trimster!</Text>
      <Text style={styles.subHeader}>Vælg mellem alle de dygtige frisører</Text>
  
      {/* Knapper til at vælge region */}
      <View style={styles.buttonContainer}>
        {regions.map((region) => {
          return (
            <TouchableOpacity
              key={region}
              style={[
                styles.regionButton,
                selectedRegion === region && styles.selectedRegionButton,
              ]}
              onPress={() => setSelectedRegion(region)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedRegion === region && styles.selectedButtonText,
                ]}
              >
                Frisører i {region}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
  
      {/* Filter for behandlingstyper */}
      <View style={styles.filterBox}>
        <Text style={styles.filterHeader}>Ledige tider:</Text>
        <View style={styles.filterButtons}>
          {treatments.map((treatment) => {
            return (
              <TouchableOpacity
                key={treatment}
                style={[
                  styles.treatmentButton,
                  selectedTreatment === treatment && styles.selectedTreatmentButton,
                ]}
                onPress={() => setSelectedTreatment(treatment)}
              >
                <Text
                  style={[
                    styles.treatmentButtonText,
                    selectedTreatment === treatment && styles.selectedTreatmentButtonText,
                  ]}
                >
                  {treatment}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
  
        {/* Liste over tilgængelige tider baseret på valgte region og behandlingstype */}
       
        {availableAppointments
          .filter(
            (appointment) =>
              (!selectedRegion || appointment.region === selectedRegion) &&
              (!selectedTreatment || appointment.treatmentType === selectedTreatment)
          )
          .map((appointment, index) => {
            return (
              <View key={index} style={styles.appointmentItem}>
                <View style={styles.salonBox}>
                  <Text style={styles.salonText}>{appointment.salonName}</Text>
                  <Text style={styles.appointmentText}>
                    Du kan få "{appointment.appointmentType}" hos os
                  </Text>
                  <Text style={styles.dateTimeText}>
                    {`Dato: ${appointment.date}, Tid: ${appointment.time}`}
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
            );
          })}
      </View>
    </ScrollView>
  );  
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#E1F5FF', // Baggrundsfarve
  },
  header: {
    fontSize: 24,
    color: '#FFCBF1', // Lyserød overskrift
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Bold',
  },
  subHeader: {
    fontSize: 18,
    color: '#1A1A1A', // Sort tekstfarve
    marginBottom: 16,
    // fontFamily: 'IBMPlexMono-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  regionButton: {
    backgroundColor: '#FFCBF1', // Lyserød baggrundsfarve
    borderRadius: 5,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
  selectedRegionButton: {
    backgroundColor: '#1A1A1A', // Sort baggrundsfarve for valgte knap
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: 'white',
  },
  filterBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  filterHeader: {
    fontSize: 18,
    color: '#FFCBF1', // Lyserød overskrift
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Bold',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  treatmentButton: {
    backgroundColor: '#FFCBF1', // Lyserød baggrundsfarve
    borderRadius: 5,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
  selectedTreatmentButton: {
    backgroundColor: '#1A1A1A', // Sort baggrundsfarve for valgte knap
  },
  treatmentButtonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  selectedTreatmentButtonText: {
    color: 'white',
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  salonBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  salonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Bold',
  },
  appointmentText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 8,
    // fontFamily: 'IBMPlexMono-Regular',
  },
  originalPrice: {
    fontSize: 14,
    color: 'red',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
  discountedPriceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  discountedPriceLabel: {
    fontSize: 16,
    color: 'black',
    marginRight: 4,
  },
  discountedPrice: {
    fontSize: 20,
    color: '#FFCBF1',
  },
  bookButton: {
    backgroundColor: '#FFCBF1', // Lyserød baggrundsfarve
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    width: '100%', // Fylder hele bredden
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    color: 'black',
    // fontFamily: 'IBMPlexMono-Bold',
  },
});