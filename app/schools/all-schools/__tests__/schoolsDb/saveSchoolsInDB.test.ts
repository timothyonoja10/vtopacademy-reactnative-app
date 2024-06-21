import { SQLiteDatabase } from "expo-sqlite";
import saveSchoolsInDB from "../../schoolsDb/saveSchools";

jest.mock('expo-sqlite', () => {
  return {
    SQLiteDatabase: jest.fn().mockImplementation(() => {
      return {
        runAsync: jest.fn()
      };
    })
  };
});

describe('saveSchoolsInDB', () => {
  let db: jest.Mocked<SQLiteDatabase>;

  beforeEach(() => {
    // Creating a mock instance of SQLiteDatabase with required parameters
    const mockNativeDatabase = {}; // Mock the native database object as needed
    db = new (SQLiteDatabase as jest.Mock<SQLiteDatabase>)('testDatabase', {}, mockNativeDatabase) as jest.Mocked<SQLiteDatabase>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save schools in the database and return true', async () => {
    const schools: School[] = [
      { schoolId: 1, name: 'School 1', number: 100 },
      { schoolId: 2, name: 'School 2', number: 200 }
    ];

    const result = await saveSchoolsInDB(db, schools);
    expect(result).toBe(true);
    expect(db.runAsync).toHaveBeenCalledTimes(2);
    expect(db.runAsync).toHaveBeenNthCalledWith(1, 'INSERT INTO schools (schoolId, name, number) VALUES (?, ?, ?)', [1, 'School 1', 100]);
    expect(db.runAsync).toHaveBeenNthCalledWith(2, 'INSERT INTO schools (schoolId, name, number) VALUES (?, ?, ?)', [2, 'School 2', 200]);
  });

  it('should throw an error if the database insert operation fails', async () => {
    const schools = [{ schoolId: 1, name: 'School 1', number: 100 }];
    const mockError = new Error('Database error');
    db.runAsync.mockRejectedValue(mockError);

    await expect(saveSchoolsInDB(db, schools)).rejects.toThrow('Database error');
    expect(db.runAsync).toHaveBeenCalledTimes(1);
    expect(db.runAsync).toHaveBeenCalledWith('INSERT INTO schools (schoolId, name, number) VALUES (?, ?, ?)', [1, 'School 1', 100]);
  });
});
