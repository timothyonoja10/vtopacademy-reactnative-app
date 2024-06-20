
import React from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import { Stack } from 'expo-router';
import processForgotPasswordForm from './forgotPasswordFormProcessor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Page() {
  const [username, onChangeText] = React.useState('');

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{ title: 'Forgot Password', }}
      />
      <ThemedView>
        <ThemedText>Enter your email</ThemedText>

        <ThemedText>Email</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={username}
        />

        <Button
          title="Submit"
          onPress={() => processForgotPasswordForm(username)}
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