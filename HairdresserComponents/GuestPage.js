import React from 'react';
import { View , Text, StyleSheet } from 'react-native';
import SignUpForm from "./Auth/SignUpForm"
import LoginForm from "./Auth/LoginForm"

function GuestPage({ navigation }) {
  return (
    <View style={styles.container}>      
    <Text>Barber login</Text>
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