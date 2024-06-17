
export default async function generateForgotPasswordCode(username: string) {
  const res = await fetch('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/auth/forgot-password', {
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
