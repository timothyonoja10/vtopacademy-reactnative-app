import { type SQLiteDatabase } from "expo-sqlite";
import deleteAllSchoolsInDB from "./deleteSchools";
import saveSchoolsInDB from "./saveSchools";

export default async function updateSchoolsInDB(db: SQLiteDatabase, schools: School[]): Promise<boolean> {
  const deleted = await deleteAllSchoolsInDB(db);
  const saved = await saveSchoolsInDB(db, schools);
  if (!deleted || !saved) {
    return false;
  }
  return true;
}