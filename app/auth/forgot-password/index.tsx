
import React from 'react';
import { Stack } from 'expo-router';
import processForgotPasswordForm from './forgotPasswordFormProcessor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';

export default function Page() {
  const [username, onChangeText] = React.useState('');

  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{ title: 'Forgot Password' }}
      />
      
      <ThemedText>Enter your email</ThemedText>
      <ThemedTextInput
        onChangeText={onChangeText}
        value={username}
      />

      <ThemedButton
        title="Submit"
        onPress={() => processForgotPasswordForm(username)}
      />
    </ThemedSafeAreaView>
  );
};