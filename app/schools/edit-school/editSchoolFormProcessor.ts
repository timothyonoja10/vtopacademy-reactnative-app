import { router } from 'expo-router';
import updateSchool from './updateSchoolApi';

export default async function processEditSchoolForm(
    schoolId: number, name: string, number: number
): Promise<Boolean> {
  try {
    const edited = await updateSchool(schoolId, name, number);
    if (edited) {
      router.replace('/schools/all-schools');
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}