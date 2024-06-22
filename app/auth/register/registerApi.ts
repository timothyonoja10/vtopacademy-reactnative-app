import { API_BASE_URL } from "@/constants/BaseUrl";

export default async function makeRegistration(username: string, password: string) {  
  const confirmPassword = password;
  let url = API_BASE_URL + 'auth/register';
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, confirmPassword })
  });
    
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Unable to register. Enter valid inputs and try again');
  }
  return res.json();
}