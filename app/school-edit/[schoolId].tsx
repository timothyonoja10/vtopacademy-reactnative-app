
import React, { useEffect, useState } from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button, View, ActivityIndicator, StatusBar} from 'react-native';
import processEditSchoolForm from './editSchoolFormProcessor';
import { Stack, useLocalSearchParams } from 'expo-router';
import getSchool from './getSchoolApi';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

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
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Edit school',
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ThemedView>
          <ThemedText>Edit school</ThemedText>
      
          <ThemedText>Name</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
          />

          <ThemedText>Password</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType='numeric'
          />

          <Button
            title="Submit"
            onPress={() => processEditSchoolForm(Number(schoolId), name, Number(number))}
          />
        </ThemedView>
      )}
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    button: {
      color: 'blue',
      backgroundColor: 'black'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});