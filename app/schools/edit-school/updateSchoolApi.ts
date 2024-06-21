import { API_BASE_URL } from "@/constants/BaseUrl";
import { getAccessToken } from "../../auth/authenticationStore/authStore";

export default async function updateSchool(
  schoolId: number, name: string, number: number
): Promise<boolean> {

  const url = `${API_BASE_URL}schools/${schoolId}`;

  const accessToken =  await getAccessToken();
  if (!accessToken) {
    console.log(accessToken);
    return false;
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ name, number }) 
  });
  
  if (!res.ok) {
    const errorResponse = await res.text();
    console.log(errorResponse);
    return false;
  }
    
  return true;
}
