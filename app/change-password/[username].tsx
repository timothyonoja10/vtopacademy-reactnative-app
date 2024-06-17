import React from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import processChangePasswordForm from './changePasswordFormProcessor';
import { convertToString } from '../utilities';

export default function Page() {
  const { username } = useLocalSearchParams();
  const [code, onChangeCode] = React.useState('');
  const [password, onChangeNumber] = React.useState('');
  const parsedUsername = convertToString(username);
  console.log(`parameter: ${parsedUsername}`);

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Change Password' }} />
      
      <Text>Enter the code sent to your email</Text>

      <Text>Code</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCode}
        value={code}
      />

      <Text>New Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
      />

      <Button
        title="Submit"
        onPress={() => processChangePasswordForm(parsedUsername, password, code)}
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