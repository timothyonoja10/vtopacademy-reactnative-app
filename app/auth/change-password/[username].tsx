import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import processChangePasswordForm from './changePasswordFormProcessor';
import { convertToString } from '../../utilities';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';

export default function Page() {
  const { username } = useLocalSearchParams();
  const [code, onChangeCode] = React.useState('');
  const [password, onChangeNumber] = React.useState('');
  const parsedUsername = convertToString(username);
  console.log(`parameter: ${parsedUsername}`);

  return (
    <ThemedSafeAreaView>
      <Stack.Screen options={{ title: 'Change Password' }} />
      
      <ThemedText>Enter the code sent to your email</ThemedText>
      <ThemedTextInput
        onChangeText={onChangeCode}
        value={code}
      />

      <ThemedText>Set new password</ThemedText>
      <ThemedTextInput
        onChangeText={onChangeNumber}
        value={password}
      />

      <ThemedButton
        title="Submit"
        onPress={() => processChangePasswordForm(parsedUsername, password, code)}
      />
      
    </ThemedSafeAreaView>
  );
};