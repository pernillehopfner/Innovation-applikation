import React, { useState } from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


function SignUpForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const auth = getAuth();

  const handleSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Håndter vellykket oprettelse her...
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      // Håndter fejl under oprettelsesforsøg her...
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ny bruger? Opret dig her👇</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="phone"
        value={phone}
        onChangeText={(phone) => setPhone(phone)}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        style={styles.inputField}
      />
      {errorMessage && (
        <Text style={styles.error}>Fejl: {errorMessage}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={() => handleSubmit()} title="Opret bruger" color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1F5FF',
    padding: 20,
  },
  header: {
    fontSize: 30,
    color: '#FFCBF1',
    textAlign: 'center',
  },
  inputField: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  error: {
    color: 'pink',
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#FFCBF1',
    borderRadius: 5,
    padding: 10,
    width: 300,
    alignSelf: 'center', // Centrer knappen i midten
  },
});

export default SignUpForm;
