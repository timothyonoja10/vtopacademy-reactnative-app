
import React from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button} from 'react-native';
import processAddSchoolForm from './addSchoolFormProcessor';
import { Stack } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Page() {
  const [name, onChangeName] = React.useState('');
  const [number, onChangeNumber] = React.useState('0');

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'Add new school',
        }}
      />
      <ThemedView>
        <ThemedText>Add new school</ThemedText>
        <ThemedText>Name</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
        />

        <ThemedText>Number</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType='numeric'
        />

        <Button
          title="Submit"
          onPress={() => processAddSchoolForm(name, Number(number))}
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