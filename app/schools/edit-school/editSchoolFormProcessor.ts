import { router } from 'expo-router';
import updateSchool from './updateSchoolApi';

export default async function processEditSchoolForm(
    schoolId: number, name: string, number: number
): Promise<Boolean> {
  try {
    const jsonData = await updateSchool(schoolId, name, number);
    router.replace('/schools/all-schools');
    return true;
  } catch (error) {
    return false;
  }
}