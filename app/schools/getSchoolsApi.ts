
export default async function getSchools(): Promise<School[]> {
  try {
    const response = await fetch('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/schools'); 
    if (!response.ok) {
      //console.error('Failed to fetch schools');
      return []; // Return an empty array in case of failure
    } 
    const data: School[] = await response.json();
    return data;
  } catch (error) {
    //console.error(error);
    return []; // Return an empty array in case of an exception
  }
}
