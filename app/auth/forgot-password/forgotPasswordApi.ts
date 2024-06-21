import { API_BASE_URL } from "@/constants/BaseUrl";

export default async function generateForgotPasswordCode(username: string) {
  let url = API_BASE_URL + 'auth/forgot-password';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  });
      
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Unable to generate forgot password code. Enter valid email and try again');
  }
  
  return res.json();
}
