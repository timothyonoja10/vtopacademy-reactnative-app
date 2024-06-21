
import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Pressable, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { isAdmin } from '../../auth/authenticationStore/authStore';
import { useSQLiteContext } from 'expo-sqlite';
import { shouldSupportOfflineStorage } from '../../utilities';
import getSchools from './schoolsRepository';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Page() { 
  const [isLoading, setLoading] = useState(true);
  const [isAdminstrator, setAdminstrator] = useState(true);
  const [schools, setSchools] = useState<School[]>([]);
  let db = shouldSupportOfflineStorage() ? useSQLiteContext() : null;
  
  const loadSchools = async () => {
    const response = await getSchools(db);
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
        <ThemedView>
          {isAdminstrator && (
            <Link href="/schools/add-school" asChild >
              <Pressable><ThemedText>Add New School</ThemedText></Pressable>
            </Link> 
          )}
          <FlatList
            data={schools}
            keyExtractor={({schoolId}) => schoolId.toString()}
            renderItem={({item}) => (
              <>
                <ThemedText>{item.name}</ThemedText>
                {isAdminstrator && (
                  <>
                    <Link href={`/schools/edit-school/${item.schoolId}`} asChild >
                      <Pressable><ThemedText>Edit</ThemedText></Pressable>
                    </Link>
                    <Link href={`/schools/delete-school/${item.schoolId}`} asChild >
                      <Pressable><ThemedText>Delete</ThemedText></Pressable>
                    </Link>
                  </> 
                )}
              </>
            )}
          />
        </ThemedView>
      )}
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

