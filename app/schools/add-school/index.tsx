
import React from 'react';
import processAddSchoolForm from './addSchoolFormProcessor';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

export default function Page() {
  const [name, onChangeName] = React.useState('');
  const [number, onChangeNumber] = React.useState('0');

  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{ title: 'Add new school' }}
      />
      <>
        <ThemedText>Add new school</ThemedText>
        <ThemedText>Name</ThemedText>
        <ThemedTextInput
          onChangeText={onChangeName}
          value={name}
        />

        <ThemedText>Number</ThemedText>
        <ThemedTextInput
          onChangeText={onChangeNumber}
          value={number}
          keyboardType='numeric'
        />

        <ThemedButton
          title="Submit"
          onPress={() => processAddSchoolForm(name, Number(number))}
        />
      </>  
    </ThemedSafeAreaView>
  );
};