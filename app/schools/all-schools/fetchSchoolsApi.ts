import { API_BASE_URL } from "@/constants/BaseUrl";

export default async function fetchSchoolsFromApi(): Promise<School[]> {
  try {
    let url = API_BASE_URL + 'schools';
    const response = await fetch(url); 
    if (!response.ok) {
      //console.error('Failed to fetch schools');
      return []; // Return an empty array in case of failure
    } 
    const data: School[] = await response.json();
    return data;
  } catch (error) {
    //console.error(error);
    return []; // Return an empty array in case of an exception
  }
}