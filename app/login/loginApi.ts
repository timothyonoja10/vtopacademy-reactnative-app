
export default async function makeLogin(username: string, password: string) {
  const res = await fetch('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/auth/login', {
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

