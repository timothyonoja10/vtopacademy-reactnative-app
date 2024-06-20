import React from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import processLoginForm from './loginFormProcessor';
import { Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Page() {
  const [username, onChangeText] = React.useState('');
  const [password, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'Login',
        }}
      />
      <ThemedView>
        <ThemedText>Login</ThemedText>
        <ThemedText>Username</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={username}
        />

        <ThemedText>Password</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={password}
        />

        <Button
          title="Submit"
          onPress={() => processLoginForm(username, password)}
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