
import { router } from 'expo-router';
import deleteSchool from './deleteSchoolApi';

export default async function processAddSchoolForm(
    schoolId: number
): Promise<Boolean> {
  try {
    const jsonData = await deleteSchool(schoolId);
    router.replace('/schools');
    return true;
  } catch (error) {
   
  }
  return false;
}