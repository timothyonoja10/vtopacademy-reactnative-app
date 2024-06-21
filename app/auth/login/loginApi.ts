import { API_BASE_URL } from "@/constants/BaseUrl";

export default async function makeLogin(username: string, password: string) {
  let url = API_BASE_URL + 'auth/login';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password})
  });
    
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Unable to login. Enter valid inputs and try again');
  }

  return res.json();
}

