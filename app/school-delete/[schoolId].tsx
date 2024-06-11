import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Button, Pressable, SafeAreaView, Text } from 'react-native';
import processDeleteSchoolForm from './deleteFormProcessor';

export default function Page() {
  const { schoolId } = useLocalSearchParams();
  return(
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'Delete school',
        }}
      />
      <Text>Delete confirmation</Text>
      <Text>Are you sure you want to delete this school?</Text>
      <Link href="/schools" asChild >
        <Pressable>
          <Text>No</Text>
        </Pressable>
      </Link> 
      <Button
        title="Yes"
        onPress={() => processDeleteSchoolForm(Number(schoolId))}
      />
    </SafeAreaView>
  );
}
