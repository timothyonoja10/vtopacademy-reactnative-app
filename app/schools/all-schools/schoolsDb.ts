import { SQLiteDatabase } from "expo-sqlite";

export async function getSchoolsFromDB(db: SQLiteDatabase): Promise<School[]> {
  return await db.getAllAsync<School>('SELECT * FROM schools');
}

export async function updateSchoolsInDB(db: SQLiteDatabase, schools: School[]): Promise<boolean> {
  const deleted = await deleteAllSchoolsInDB(db);
  const saved = await saveSchoolsInDB(db, schools);
  if (!deleted && !saved) {
    return false;
  }
  return true;
}

export async function deleteAllSchoolsInDB(db: SQLiteDatabase): Promise<boolean> {
  await db.runAsync('DELETE FROM schools');
  return true;
}

export async function saveSchoolsInDB(db: SQLiteDatabase, schools: School[]): Promise<boolean> {
  const insertPromises = schools.map(school => {
    return db.runAsync(
      'INSERT INTO schools (schoolId, name, number) VALUES (?, ?, ?)',
      [school.schoolId, school.name, school.number]
    );
  });
  await Promise.all(insertPromises);
  return true;
}

