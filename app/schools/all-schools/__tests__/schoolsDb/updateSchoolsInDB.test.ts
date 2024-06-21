import { SQLiteDatabase } from "expo-sqlite";
import deleteAllSchoolsInDB from "../../schoolsDb/deleteSchools";
import saveSchoolsInDB from "../../schoolsDb/saveSchools";
import updateSchoolsInDB from "../../schoolsDb/updateSchools";

jest.mock('../../schoolsDb/deleteSchools');
jest.mock('../../schoolsDb/saveSchools');

describe('updateSchoolsInDB', () => {
  let db: jest.Mocked<SQLiteDatabase>;

  beforeEach(() => {
    // Creating a mock instance of SQLiteDatabase with required parameters
    const mockNativeDatabase = {}; // Mock the native database object as needed
    db = new (SQLiteDatabase as jest.Mock<SQLiteDatabase>)('testDatabase', {}, mockNativeDatabase) as jest.Mocked<SQLiteDatabase>;
  });


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update schools in the database and return true', async () => {
    (deleteAllSchoolsInDB as jest.Mock).mockResolvedValue(true);
    (saveSchoolsInDB as jest.Mock).mockResolvedValue(true);

    const schools = [
      { schoolId: 1, name: 'School 1', number: 100 },
      { schoolId: 2, name: 'School 2', number: 200 }
    ];

    const result = await updateSchoolsInDB(db, schools);
    expect(result).toBe(true);
    expect(deleteAllSchoolsInDB).toHaveBeenCalledWith(db);
    expect(saveSchoolsInDB).toHaveBeenCalledWith(db, schools);
  });

  it('should return false if deleteAllSchoolsInDB or saveSchoolsInDB fails', async () => {
    (deleteAllSchoolsInDB as jest.Mock).mockResolvedValue(false);
    (saveSchoolsInDB as jest.Mock).mockResolvedValue(true);

    const schools = [
      { schoolId: 1, name: 'School 1', number: 100 },
      { schoolId: 2, name: 'School 2', number: 200 }
    ];

    const result = await updateSchoolsInDB(db, schools);
    expect(result).toBe(false);
  });
});
