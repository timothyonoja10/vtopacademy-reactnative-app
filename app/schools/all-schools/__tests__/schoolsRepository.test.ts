import { SQLiteDatabase } from "expo-sqlite";
import fetchSchoolsFromApi from "../fetchSchoolsApi";
import updateSchoolsInDB from "../schoolsDb/updateSchools";
import getSchoolsFromDB from "../schoolsDb/getSchools";
import getSchools from "../schoolsRepository";

// Mock the dependencies
jest.mock("../fetchSchoolsApi");
jest.mock("../schoolsDb/updateSchools");
jest.mock("../schoolsDb/getSchools");

describe("getSchools", () => {
  const dbMock = {} as SQLiteDatabase;
  const schoolsMock = [{ id: 1, name: "School A" }, { id: 2, name: "School B" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch schools from API and update DB when schools are returned", async () => {
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue(schoolsMock);
    (updateSchoolsInDB as jest.Mock).mockResolvedValue(undefined);
    (getSchoolsFromDB as jest.Mock).mockResolvedValue(schoolsMock);

    const result = await getSchools(dbMock);

    expect(result).toEqual(schoolsMock);
  });

  it("should fetch schools from API and return them directly if db is null", async () => {
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue(schoolsMock);

    const result = await getSchools(null);

    expect(result).toEqual(schoolsMock);
  });

  it("should not update DB if no schools are returned from API", async () => {
    (fetchSchoolsFromApi as jest.Mock).mockResolvedValue([]);
    (getSchoolsFromDB as jest.Mock).mockResolvedValue([]);

    const result = await getSchools(dbMock);
    
    expect(result).toEqual([]);
  });
});
