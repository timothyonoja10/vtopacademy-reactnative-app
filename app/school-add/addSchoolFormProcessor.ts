
import { router } from 'expo-router';
import saveSchool from "./saveSchoolApi";

export default async function processAddSchoolForm(
  name: string, number: number
): Promise<Boolean> {
  if (name === '' || number === 0) {
    return false;
  }
  try {
    const jsonData = await saveSchool(name, number);
    router.replace('/schools');
    return true;
  } catch (error) {
  
  }
  return false;
}