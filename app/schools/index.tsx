
import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, StatusBar,
   SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import getSchools from './getSchoolsApi';
import { isAdmin } from '../authenticationStore/authStore';

export default function Page() { 
  const [isLoading, setLoading] = useState(true);
  const [isAdminstrator, setAdminstrator] = useState(true);
  const [schools, setSchools] = useState<School[]>([]);
  
  const loadSchools = async () => {
    const response = await getSchools();
    const adminStatus = await isAdmin();
    setSchools(response);
    setAdminstrator(adminStatus);
    setLoading(false);
  }

  useEffect(() => {
    loadSchools();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Schools',
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {isAdminstrator && (
            <Link href="/school-add" asChild >
              <Pressable><Text>Add New School</Text></Pressable>
            </Link> 
          )}
          <FlatList
            data={schools}
            keyExtractor={({schoolId}) => schoolId.toString()}
            renderItem={({item}) => (
              <View>
                <Text>{item.name}</Text>
                {isAdminstrator && (
                  <View>
                    <Link href={`/school-edit/${item.schoolId}`} asChild >
                      <Pressable><Text>Edit</Text></Pressable>
                    </Link>
                    <Link href={`/school-delete/${item.schoolId}`} asChild >
                      <Pressable><Text>Delete</Text></Pressable>
                    </Link>
                  </View> 
                )}
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView> 
  );
}

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
  }
});

