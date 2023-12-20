import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getDatabase, ref, push } from "firebase/database";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function HomeScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [treatmentType, setTreatmentType] = useState('Klip');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [handler, setHandler] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const submitAppointment = () => {
    const db = getDatabase();
    const appointmentsRef = ref(db, 'appointments');
    const newAppointmentRef = push(appointmentsRef);


    push(newAppointmentRef, {
      date: date.toISOString(),
      treatmentType,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      handler,
      phoneNumber
    })
    .then(() => Alert.alert('Success', 'Frisørtid oprettet!'))
    .catch(error => Alert.alert('Error', 'Der opstod en fejl: ' + error.message));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisibility(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.header}>Tidspunkt:</Text>
          <Button title="Vælg Dato og Tid" onPress={showDatePicker} />
          {isDatePickerVisible && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'datetime'}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Behandlingstype:</Text>
          <Picker
            selectedValue={treatmentType}
            onValueChange={(itemValue, itemIndex) => setTreatmentType(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Klip" value="Klip" />
            <Picker.Item label="Vask og føn" value="Vask og føn" />
            <Picker.Item label="Farvning" value="Farvning" />
          </Picker>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Før-pris:</Text>
          <TextInput
            style={styles.input}
            value={originalPrice}
            onChangeText={setOriginalPrice}
            placeholder="Indtast før-pris"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Ny pris:</Text>
          <TextInput
            style={styles.input}
            value={discountedPrice}
            onChangeText={setDiscountedPrice}
            placeholder="Indtast ny pris"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Behandler:</Text>
          <TextInput
            style={styles.input}
            value={handler}
            onChangeText={setHandler}
            placeholder="Behandlerens navn"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Telefonnummer:</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Indtast telefonnummer"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity onPress={submitAppointment} style={styles.button}>
          <Text style={styles.buttonText}>Opret frisørtid</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Or any color that matches your theme
  },
  scrollView: {
    padding: 20,
  },
  section: {
    marginBottom: 20, // Adjust the space between sections
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18, // Adjust the font size as needed
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white', // White background for input fields
    borderColor: '#000', // Black border color for input fields
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  picker: {
    backgroundColor: 'white', // White background for picker or any other components
    borderColor: '#000', // Black border color for picker
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20, // Adjust the space below the picker
  },
  button: {
    backgroundColor: '#FFC0CB', // Pink color for the button
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20, // Space above the button
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeScreen;

