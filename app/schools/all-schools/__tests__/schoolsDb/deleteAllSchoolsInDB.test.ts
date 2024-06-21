import { SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";
import deleteAllSchoolsInDB from "../../schoolsDb/deleteSchools";

jest.mock('expo-sqlite', () => {
  return {
    SQLiteDatabase: jest.fn().mockImplementation(() => {
      return {
        runAsync: jest.fn()
      };
    })
  };
});

describe('deleteAllSchoolsInDB', () => {
  let db: jest.Mocked<SQLiteDatabase>;

  beforeEach(() => {
    // Creating a mock instance of SQLiteDatabase with required parameters
    const mockNativeDatabase = {}; // Mock the native database object as needed
    db = new (SQLiteDatabase as jest.Mock<SQLiteDatabase>)('testDatabase', {}, mockNativeDatabase) as jest.Mocked<SQLiteDatabase>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete all schools in the database and return true', async () => {
    const mockRunResult: SQLiteRunResult = { changes: 1, lastInsertRowId: 1 };
    db.runAsync.mockResolvedValue(mockRunResult);

    const result = await deleteAllSchoolsInDB(db);
    expect(result).toBe(true);
    expect(db.runAsync).toHaveBeenCalledWith('DELETE FROM schools');
  });

  it('should throw an error if the database delete operation fails', async () => {
    const mockError = new Error('Database error');
    db.runAsync.mockRejectedValue(mockError);

    await expect(deleteAllSchoolsInDB(db)).rejects.toThrow('Database error');
    expect(db.runAsync).toHaveBeenCalledWith('DELETE FROM schools');
  });
});
