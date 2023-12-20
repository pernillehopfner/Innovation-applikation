import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native'; // Notice ScrollView is added here
import { getDatabase, ref, push} from "firebase/database";
import { Picker } from '@react-native-picker/picker';


function HomeScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [treatmentType, setTreatmentType] = useState('Klip');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [handler, setHandler] = useState('');

  const submitAppointment = () => {
    const db = getDatabase();
    const appointmentsRef = ref(db, 'appointments');
    const newAppointmentRef = push(appointmentsRef);

    push(newAppointmentRef, {
      date,
      treatmentType,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      handler
    })
    .then(() => alert('Frisørtid oprettet!'))
    .catch(error => alert('Der opstod en fejl: ' + error.message));
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Tidspunkt:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="DD/MM/YYYY HH:MM"
      />
      <Text>Behandlingstype:</Text>
      <Picker
        selectedValue={treatmentType}
        onValueChange={(itemValue, itemIndex) => setTreatmentType(itemValue)}
      >
        <Picker.Item label="Klip" value="Klip" />
        <Picker.Item label="Vask og føn" value="Vask og føn" />
        <Picker.Item label="Farvning" value="Farvning" />
      </Picker>
      <Text>Før-pris:</Text>
      <TextInput
        style={styles.input}
        value={originalPrice}
        onChangeText={setOriginalPrice}
        placeholder="Indtast før-pris"
        keyboardType="numeric"
      />
      <Text>Ny pris:</Text>
      <TextInput
        style={styles.input}
        value={discountedPrice}
        onChangeText={setDiscountedPrice}
        placeholder="Indtast ny pris"
        keyboardType="numeric"
      />
      <Text>Behandler:</Text>
      <TextInput
        style={styles.input}
        value={handler}
        onChangeText={setHandler}
        placeholder="Behandlerens navn"
      />
      <Button title="Opret frisørtid" onPress={submitAppointment} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  }
});

export default HomeScreen;
