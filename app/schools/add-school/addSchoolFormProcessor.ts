
import { router } from 'expo-router';
import saveSchool from "./saveSchoolApi";

export default async function processAddSchoolForm(
  name: string, number: number
): Promise<Boolean> {
  if (name === '' || number === 0) {
    return false;
  }
  try {
    const saved = await saveSchool(name, number);
    if (saved) {
      router.replace('/schools/all-schools');
      return true;
    }
  } catch (error) {
  
  }
  return false;
}