
export default async function changePassword(
    username: string, newPassword: string, code: string
) {
  const res = await fetch('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/auth/change-password', {
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