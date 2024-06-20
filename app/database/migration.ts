import AsyncStorage from '@react-native-async-storage/async-storage';
import { type SQLiteDatabase } from 'expo-sqlite';

export default async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  // let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = await getCurrentDbVersion();
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE schools (schooIid INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, number INTEGER);
  ` );
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  await saveCurrentDbVersion(DATABASE_VERSION);
}

async function getCurrentDbVersion(): Promise<number> {
  try {
    const value = await AsyncStorage.getItem('currentDbVersion');
    if (value !== null) {
      return Number(value);
    }
  } catch (e) {
    
  }
  return 0;
}

async function saveCurrentDbVersion(currentDbVersion: number): Promise<boolean> {
  try {
    await AsyncStorage.setItem('currentDbVersion', currentDbVersion.toString());
    return true;
  } catch (e) {
    // error saving value
    return false;
  }
}