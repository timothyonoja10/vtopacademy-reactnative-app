import { SQLiteDatabase } from "expo-sqlite";

export default async function deleteAllSchoolsInDB(db: SQLiteDatabase): Promise<boolean> {
  await db.runAsync('DELETE FROM schools');
  return true;
}