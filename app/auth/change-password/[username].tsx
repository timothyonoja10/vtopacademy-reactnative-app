import React from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import processChangePasswordForm from './changePasswordFormProcessor';
import { convertToString } from '../../utilities';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Page() {
  const { username } = useLocalSearchParams();
  const [code, onChangeCode] = React.useState('');
  const [password, onChangeNumber] = React.useState('');
  const parsedUsername = convertToString(username);
  console.log(`parameter: ${parsedUsername}`);

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Change Password' }} />
      
      <ThemedView>
        <ThemedText>Enter the code sent to your email</ThemedText>

        <ThemedText>Code</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCode}
          value={code}
        />

        <ThemedText>New Password</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={password}
        />

        <Button
          title="Submit"
          onPress={() => processChangePasswordForm(parsedUsername, password, code)}
        />
      </ThemedView>
      
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