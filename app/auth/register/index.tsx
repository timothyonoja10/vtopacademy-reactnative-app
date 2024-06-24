import React from 'react';
import processRegistrationForm from './registrationFormProcessor';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function Page() {
  const [username, onChangeText] = React.useState('');
  const [password, onChangeNumber] = React.useState('');

  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{ title: 'Register' }}
      />
      
      <ThemedText>Username</ThemedText>
      <ThemedTextInput
        onChangeText={onChangeText}
        value={username}
      />

      <ThemedText>Password</ThemedText>
      <ThemedTextInput
        onChangeText={onChangeNumber}
        value={password}
      />

      <ThemedButton
        title="Register"
        onPress={() => processRegistrationForm(username, password)}
      />
    </ThemedSafeAreaView>
  );
};
