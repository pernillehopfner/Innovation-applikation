import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
       
        {/* Overskrift */}
      <Text style={styles.header}>Velkommen til Trimster!</Text>

      {/* Beskrivelse af appen */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Appen der bringer frisører og kunder tættere på hinanden ved at tilbyde en platform, hvor frisører kan tilbyde ledige tider på dagen til nedsatte priser, og hvor kunderne kan finde den perfekte behandling til den rigtige pris.
        </Text>
      </View>

      {/* Underskrift for anmeldelser */}
      <Text style={styles.subHeader}>Læs her, hvordan Trimster har hjulpet med at finde den helt rette frisør, til den helt rette pris:</Text>
      
      {/* Loop gennem anmeldelser og vis dem */}
      {salonReviews.map((salon, index) => (
        <View key={index} style={styles.reviewBox}>
         
          {/* Tekst for anmeldelse */}
          <Text style={styles.reviewText}>
            {`Anmeldelse af ${salon.salonName}:\n${salon.text}`}
          </Text>
         
         {/* Knappen til "Se mere" med navigation til frisørdetaljer */}
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => navigation.navigate('Frisør detaljer', { salonName: salon.salonName })}
          >
            <Text style={styles.readMoreText}>Se mere</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// Dummy anmeldelser for forskellige frisører
const salonReviews = [
  { salonName: 'Salon A', text: 'Trimster har været fantastisk til at hjælpe mig med at finde den perfekte frisør. Jeg fandt en salon i mit område til en super pris!' },
  { salonName: 'Salon B', text: 'Jeg har brugt Trimster i flere måneder nu, og det har virkelig sparet mig penge på mine frisørbehandlinger. Jeg elsker det!' },
  { salonName: 'Salon C', text: 'Takket være Trimster har jeg opdaget nogle fantastiske frisører, jeg aldrig ville have fundet ellers. Jeg er så tilfreds med mine resultater!' },
  { salonName: 'Salon D', text: 'Fantastisk oplevelse hos Salon D! Frisøren var meget dygtig og venlig. Jeg kommer helt sikkert tilbage!' },
  { salonName: 'Salon E', text: 'Salon E leverede en professionel farvningstjeneste til en utrolig pris. Jeg kunne ikke være gladere med resultatet!' },
  { salonName: 'Salon F', text: 'En ven anbefalede Salon F til mig, og jeg blev ikke skuffet. Den bedste klipning, jeg nogensinde har fået!' },
];

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
  descriptionBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#1A1A1A', // Sort tekstfarve
    // fontFamily: 'IBMPlexMono-Regular',
  },
  subHeader: {
    fontSize: 18,
    color: '#1A1A1A', // Sort tekstfarve
    marginBottom: 16,
    // fontFamily: 'IBMPlexMono-Regular',
  },
  reviewBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 16,
    color: '#1A1A1A', // Sort tekstfarve
    // fontFamily: 'IBMPlexMono-Regular',
  },
  readMoreButton: {
    backgroundColor: '#FFCBF1', // Lyserød baggrundsfarve
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    // fontFamily: 'IBMPlexMono-Bold',
  },
});

export default HomeScreen;

