import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Pressable, SafeAreaView } from 'react-native';
import processDeleteSchoolForm from './deleteFormProcessor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

export default function Page() {
  const { schoolId } = useLocalSearchParams();
  return(
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Delete school',
        }}
      />
      <ThemedView>
        <ThemedText>Delete confirmation</ThemedText>
        <ThemedText>Are you sure you want to delete this school?</ThemedText>
        <Link replace href="/schools/all-schools" asChild >
          <Pressable><ThemedText>No</ThemedText></Pressable>
        </Link> 
        <ThemedButton
          title="Yes"
          onPress={() => processDeleteSchoolForm(Number(schoolId))}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});