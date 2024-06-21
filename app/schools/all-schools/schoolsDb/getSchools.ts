import { SQLiteDatabase } from "expo-sqlite";

export default async function getSchoolsFromDB(db: SQLiteDatabase): Promise<School[]> {
  return await db.getAllAsync<School>('SELECT * FROM schools');
}