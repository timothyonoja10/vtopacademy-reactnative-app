
export default async function makeRegistration(username: string, password: string) {  
  const confirmPassword = password;
  const res = await fetch('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, confirmPassword })
  });
    
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log('Unable to register. Enter valid inputs and try again');
  }
  return res.json();
}