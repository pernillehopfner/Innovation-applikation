import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, updateProfile, deleteUser, signOut } from "firebase/auth";

function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  // Funktion til at opdatere brugeroplysninger
     // Her bruges deri kun en simpel opdatering af brugerens navn som et eksempel.

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: 'Nyt Navn', // Erstat med det ønskede opdaterede navn
      });
      console.log('Brugeroplysninger er blevet opdateret');
    } catch (error) {
      console.error('Fejl ved opdatering af brugeroplysninger:', error);
    }
  };

  // Funktion til at slette kontoen
  const handleDeleteProfile = async () => {
    try {
      await deleteUser(auth.currentUser);
      console.log('Brugerprofilen er blevet slettet');
    } catch (error) {
      console.error('Fejl ved sletning af brugerprofil:', error);
    }
  };

  // Funktion til at logge ud
  const handleLogOut = async () => {
    try {
      await signOut(auth);

      // Naviger til din log ind skærm efter log ud
      // Note til mig selv - tilpas til navigation.navigate('Login');
      console.log('Bruger er logget ud');
    } catch (error) {
      console.error('Fejl ved log ud:', error);
    }
  };

//   // Hvis der af en eller anden grund ikke skulle være muligt at finde den aktive bruger,
//   // skal der udprintes en besked om dette igennem en tekstkomponent
//   if (!auth.currentUser) {
//     return (
//       <View style={styles.container}>
//         <Text>Bruger ikke fundet</Text>
//       </View>
//     );
//   }

  // I return() vises brugerens oplysninger og knapper til opdatering, Vilkår og log ud
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Min Profil</Text>
      <Text>Bruger: {user.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Rediger Oplysninger</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Ud</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        {/* Tilføj navigation til vilkårene her */}
        <Text style={styles.buttonText}>Læs Vilkår</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFCBF1',
    padding: 12,
    marginVertical: 8,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default ProfileScreen;
