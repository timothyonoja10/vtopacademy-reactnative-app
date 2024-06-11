
import React, { useEffect, useState } from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, Button, View, ActivityIndicator, StatusBar} from 'react-native';
import processEditSchoolForm from './editSchoolFormProcessor';
import { useLocalSearchParams } from 'expo-router';
import getSchool from './getSchoolApi';

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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>Edit school</Text>
      
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
          />

          <Text>Password</Text>
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
        </View>
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