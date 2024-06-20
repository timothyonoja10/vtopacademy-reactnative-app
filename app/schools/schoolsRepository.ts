import { SQLiteDatabase } from "expo-sqlite";
import { shouldNotSupportOfflineStorage } from "../utilities";
import fetchSchoolsFromApi from "./fetchSchoolsApi";
import { getSchoolsFromDB, updateSchoolsInDB } from "./schoolsDb";

export default async function getSchools(db: SQLiteDatabase | null) {
  const schools = await fetchSchoolsFromApi();
  
  if (db === null || shouldNotSupportOfflineStorage()) {
    return schools;
  }
  
  if (schools.length > 0) {
    await updateSchoolsInDB(db, schools);
  }
  
  return getSchoolsFromDB(db);
}