import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native'; // Notice ScrollView is added here
import { getDatabase, ref, set, onValue, push } from "firebase/database";


function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);

  // Function to handle the text input
  const handleInputChange = (text) => {
    setMessage(text);
  };

  // Function to write the data to the database
  const writeData = () => {
    const db = getDatabase();
    const messageRef = ref(db, 'messages'); // Changed path to 'messages'
    const newMessageRef = push(messageRef); // Using push to create a new entry

    set(newMessageRef, { text: message })
      .then(() => console.log('Message written successfully!'))
      .catch(error => console.error('Failed to write message', error));
  };

  // Fetching data from the database
  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'messages');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={handleInputChange}
        placeholder="Write a message"
      />
      <Button title="Save Message" onPress={writeData} />
      <ScrollView style={styles.dataContainer}>
        <Text>Data from Firebase:</Text>
        {/* Display the messages */}
        {data && Object.values(data).map((messageObj, index) => (
          <Text key={index}>{messageObj.text}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  dataContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default HomeScreen;
