import React from 'react';
import processLoginForm from './loginFormProcessor';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';

export default function Page() {
  const [username, onChangeText] = React.useState('');
  const [password, onChangeNumber] = React.useState('');

  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{ title: 'Login' }}
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
        title="Submit"
        onPress={() => processLoginForm(username, password)}
      />
    </ThemedSafeAreaView>
  );
};