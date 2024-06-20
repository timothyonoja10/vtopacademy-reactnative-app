import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Button, Pressable, SafeAreaView, Text } from 'react-native';
import processDeleteSchoolForm from './deleteFormProcessor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Page() {
  const { schoolId } = useLocalSearchParams();
  return(
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'Delete school',
        }}
      />
      <ThemedView>
        <ThemedText>Delete confirmation</ThemedText>
        <ThemedText>Are you sure you want to delete this school?</ThemedText>
        <Link href="/schools/all-schools" asChild >
          <Pressable><ThemedText>No</ThemedText></Pressable>
        </Link> 
        <Button
          title="Yes"
          onPress={() => processDeleteSchoolForm(Number(schoolId))}
        />
      </ThemedView>
    </SafeAreaView>
  );
}