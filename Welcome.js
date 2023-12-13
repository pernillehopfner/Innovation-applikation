import React from 'react';
import { View, Text, Button } from 'react-native';

const Welcome = ({ navigation }) => {
  return (
    <View style={{width: "100%", height: "100%"}}>
      <Text>Velkommen til Trimster</Text>
      <Button
        title="Jeg er kunde"
        onPress={() => navigation.navigate('Guest')}
      />
      <Button
        title="Jeg er frisør"
        onPress={() => navigation.navigate('GuestBarber')}
      />
    </View>
  );
};

export default Welcome;
