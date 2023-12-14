import React from 'react';
import { View , Text, StyleSheet } from 'react-native';
import SignUpForm from "./customerAuth/cSignUpForm"  
import LoginForm from "./customerAuth/cLoginForm"

function GuestPage({ navigation }) {
  return (
    <View style={styles.container}>      
      <Text>Kunde</Text>
      <SignUpForm />
      <LoginForm />
    </View>
  );
}

export default GuestPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});