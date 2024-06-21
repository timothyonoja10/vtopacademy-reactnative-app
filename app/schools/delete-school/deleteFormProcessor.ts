
import { router } from 'expo-router';
import deleteSchool from './deleteSchoolApi';

export default async function processAddSchoolForm(
    schoolId: number
): Promise<Boolean> {
  try {
    const deleted = await deleteSchool(schoolId);
    if (deleted) {
      router.replace('/schools/all-schools');
      return true;
    }  
  } catch (error) {
   
  }
  return false;
}