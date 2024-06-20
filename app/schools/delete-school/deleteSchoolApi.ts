import { getAccessToken } from "../../auth/authenticationStore/authStore";

export default async function deleteSchool(schoolId: number) {
  const accessToken = await getAccessToken();

  if (!schoolId) {
    console.log('Invalid schoolId');
  } 
  const url = `http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/schools/${schoolId}`;
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
  }
}
