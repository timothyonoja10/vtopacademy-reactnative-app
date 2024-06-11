import React from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import processRegistrationForm from './registrationFormProcessor';

export default function Page() {
  const [username, onChangeText] = React.useState('');
  const [password, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <Text>Register</Text>

      <Text>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={username}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
      />

      <Button
        title="Register"
        onPress={() => processRegistrationForm(username, password)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
