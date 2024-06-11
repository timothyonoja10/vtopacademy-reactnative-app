import { Link, useLocalSearchParams } from 'expo-router';
import { Button, Pressable, SafeAreaView, Text } from 'react-native';
import processDeleteSchoolForm from './deleteFormProcessor';

export default function Page() {
  const { schoolId } = useLocalSearchParams();
  return(
    <SafeAreaView>
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
