// getSchools.test.ts
import { SQLiteDatabase } from "expo-sqlite";
import fetchSchoolsFromApi from "../fetchSchoolsApi";
import { getSchoolsFromDB } from "../schoolsDb";
import getSchools from "../schoolsRepository";

// Mocking SQLiteDatabase and its methods
jest.mock('expo-sqlite', () => {
  return {
    SQLiteDatabase: jest.fn().mockImplementation((databaseName: string, options: any, nativeDatabase: any) => ({
      databaseName,
      options,
      nativeDatabase,
      getAllAsync: jest.fn(),
    })),
  };
});

// Mocking other dependencies
jest.mock('../fetchSchoolsApi');
jest.mock('../schoolsDb');

describe('getSchools', () => {
  let db: jest.Mocked<SQLiteDatabase>;

  beforeEach(() => {
    // Creating a mock instance of SQLiteDatabase with required parameters
    const mockNativeDatabase = {}; // Mock the native database object as needed
    db = new (SQLiteDatabase as jest.Mock<SQLiteDatabase>)('testDatabase', {}, mockNativeDatabase) as jest.Mocked<SQLiteDatabase>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return schools from API when db is null', async () => {
    const mockSchools = [{ id: 1, name: 'School 1' }, { id: 2, name: 'School 2' }];
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue(mockSchools);

    const result = await getSchools(null);
    expect(result).toEqual(mockSchools);
  });

  it('should update DB and return schools from DB when API returns data', async () => {
    const mockSchools = [{ id: 1, name: 'School 1' }, { id: 2, name: 'School 2' }];
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue(mockSchools);
    const mockDbSchools = [{ id: 1, name: 'School 1' }];
    (getSchoolsFromDB as jest.Mock).mockResolvedValue(mockDbSchools);

    const result = await getSchools(db);
    expect(result).toEqual(mockDbSchools);
  });

  it('should not update DB and return schools from DB when API returns no data', async () => {
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue([]);
    const mockDbSchools = [{ id: 1, name: 'School 1' }];
    (getSchoolsFromDB as jest.Mock).mockResolvedValue(mockDbSchools);

    const result = await getSchools(db);
    expect(result).toEqual(mockDbSchools);
  });

  it('should throw an error if getSchoolsFromDB fails', async () => {
    const mockError = new Error('Database error');
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue([]);
    (getSchoolsFromDB as jest.Mock).mockRejectedValue(mockError);

    await expect(getSchools(db)).rejects.toThrow('Database error');
  });
});
