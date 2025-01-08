import { useEffect } from 'react';

const WorkWithFirebase = () => {
  interface FirebaseData {
    field?: string;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://eco-village-d5d6d-default-rtdb.firebaseio.com/products.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const responseData = (await response.json()) as FirebaseData;
        console.log(responseData);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
    fetchData().catch(error => console.error('Fetch failed:', error));
  }, []);
};

export default WorkWithFirebase;
