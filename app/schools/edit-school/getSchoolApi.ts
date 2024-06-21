import { API_BASE_URL } from "@/constants/BaseUrl";
import { getAccessToken } from "../../auth/authenticationStore/authStore";

export default async function getSchool(schoolId: number): Promise<School> {
  
  const url = `${API_BASE_URL}schools/${schoolId}`;
  
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.log('Access token is missing');
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!res.ok) {
      console.log('Failed to fetch schools. Try again');
    }
  
    const data = await res.json();
    // Assuming the response has fields 
    return {
      schoolId: data.school || 0,
      name: data.name || '',
      number: data.number || 0,
    };
  } catch (error) {
    console.log('Error fetching school:', error);
  }
  
  return {
    schoolId: 0,
    name: '',
    number: 0,
  };
}