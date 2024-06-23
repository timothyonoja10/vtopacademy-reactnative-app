
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import processEditSchoolForm from './editSchoolFormProcessor';
import { Stack, useLocalSearchParams } from 'expo-router';
import getSchool from './getSchoolApi';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

export default function Page() {
  const { schoolId } = useLocalSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [name, onChangeName] = useState('');
  const [number, onChangeNumber] = useState('0');

  const loadSchool = async () => {
    const school = await getSchool(Number(schoolId));
    onChangeName(school.name);
    onChangeNumber(school.number.toString());
    setLoading(false);
  }

  useEffect(() => {
    loadSchool();
  }, []);
  
  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{ title: 'Edit school' }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ThemedText>Edit school</ThemedText>
      
          <ThemedText>Name</ThemedText>
          <ThemedTextInput
            onChangeText={onChangeName}
            value={name}
          />

          <ThemedText>Password</ThemedText>
          <ThemedTextInput
            onChangeText={onChangeNumber}
            value={number}
            keyboardType='numeric'
          />

          <ThemedButton
            title="Submit"
            onPress={() => processEditSchoolForm(Number(schoolId), name, Number(number))}
          />
        </>
      )}
    </ThemedSafeAreaView> 
  );
};