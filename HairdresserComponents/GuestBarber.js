import React from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import SignUpForm from "./hairdresserAuth/hdSignUpForm"
import LoginForm from "./hairdresserAuth/hdLoginForm"

function GuestPageBarber({ navigation }) {
  return (
    <View style={styles.container}>      
    <Text>Frisør</Text>
    <SignUpForm />
    <LoginForm />
</View>
  );
}

export default GuestPageBarber;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});