import { API_BASE_URL } from "@/constants/BaseUrl";
import { getAccessToken } from "../../auth/authenticationStore/authStore";

export default async function deleteSchool(schoolId: number): Promise<boolean> {
  const accessToken = await getAccessToken();

  if (!schoolId) {
    console.log('Invalid schoolId');
    return false;
  }

  const url = `${API_BASE_URL}schools/${schoolId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.log(`Failed to delete school: ${errorResponse}`);
    return false;
  }

  return true;
}
