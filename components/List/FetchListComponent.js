import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { GET_USERS_URL } from './const';

const FetchListComponent = () => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const [amount, setAmount] = useState('5'); // Initialt inputværdi som en streng

  useEffect(() => {
    loadUsers();
  }, [amount]);

  const loadUsers = async () => {
    try {
      const response = await fetch(GET_USERS_URL + amount);
      const json = await response.json();
      setUsers(json.results);
    } catch (error) {
      setMsg('Error fetching data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Brugere</Text>
      {users.length > 0 ? (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text => setAmount(text)} // Fjern parseInt, da vi vil acceptere strengværdi
            value={amount} // Sørg for at bruge strengværdien her
            placeholder="Enter amount"
            keyboardType="numeric"
          />
          <ScrollView bounces={true} style={{ height: 350, width: '60%' }}>
            {users.map((user, index) => (
              <Text key={index}>
                {user.name.first} {user.name.last}
              </Text>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text>{msg ? msg : 'Loading...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    padding: 4,
  },
});

export default FetchListComponent;
