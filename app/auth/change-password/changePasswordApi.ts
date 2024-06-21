import { API_BASE_URL } from "@/constants/BaseUrl";

export default async function changePassword(
    username: string, newPassword: string, code: string
) {
  let url = API_BASE_URL + 'auth/change-password';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, newPassword, code})
  });
      
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Unable to change password. Enter valid inputs and try again');
  }
  
  return res.json();
}