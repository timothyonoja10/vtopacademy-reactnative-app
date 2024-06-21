import { API_BASE_URL } from "@/constants/BaseUrl";
import { getAccessToken } from "../../auth/authenticationStore/authStore";

export default async function saveSchool(name: string, number: number) {

  let url = API_BASE_URL + 'schools';
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.log('Access token is missing');
  }
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ name, number }) 
  });
  
  if (!res.ok) {
    const errorResponse = await res.text();
    console.log(errorResponse);
  }
    
  return await res.json();
}