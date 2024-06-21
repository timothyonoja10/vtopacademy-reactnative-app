import { SQLiteDatabase } from "expo-sqlite";
import getSchoolsFromDB from "../../schoolsDb/getSchools";

jest.mock('expo-sqlite', () => {
  return {
    SQLiteDatabase: jest.fn().mockImplementation(() => {
      return {
        getAllAsync: jest.fn()
      };
    })
  };
});

describe('getSchoolsFromDB', () => {
  let db: jest.Mocked<SQLiteDatabase>;

  beforeEach(() => {
    // Creating a mock instance of SQLiteDatabase with required parameters
    const mockNativeDatabase = {}; // Mock the native database object as needed
    db = new (SQLiteDatabase as jest.Mock<SQLiteDatabase>)('testDatabase', {}, mockNativeDatabase) as jest.Mocked<SQLiteDatabase>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return schools from the database', async () => {
    const mockSchools = [{ id: 1, name: 'School 1' }, { id: 2, name: 'School 2' }];
    db.getAllAsync.mockResolvedValue(mockSchools);

    const result = await getSchoolsFromDB(db);
    expect(result).toEqual(mockSchools);
    expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM schools');
  });

  it('should throw an error if the database query fails', async () => {
    const mockError = new Error('Database error');
    db.getAllAsync.mockRejectedValue(mockError);

    await expect(getSchoolsFromDB(db)).rejects.toThrow('Database error');
    expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM schools');
  });
});
