import { SQLiteDatabase } from "expo-sqlite";

export default async function saveSchoolsInDB(db: SQLiteDatabase, schools: School[]): Promise<boolean> {
  const insertPromises = schools.map(school => {
    return db.runAsync(
      'INSERT INTO schools (schoolId, name, number) VALUES (?, ?, ?)',
      [school.schoolId, school.name, school.number]
    );
  });
  await Promise.all(insertPromises);
  return true;
}