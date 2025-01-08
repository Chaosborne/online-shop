import { useEffect } from 'react';

const GetProductsFromFirebase = () => {
  interface IProduct {
    id: string;
    itemCategory: string;
    itemImg: string;
    itemBrand: string;
    itemName: string;
    itemDescription: string;
    itemPrice: number;
    itemQuantity: number;
    itemTotalPrice: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://eco-village-d5d6d-default-rtdb.firebaseio.com/products.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const responseData = (await response.json()) as IProduct[];
        console.log('Данные из Firebase:', responseData);
        return responseData;
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData().catch(error => console.error('Fetch failed:', error));
  }, []);

  return null; // Компонент ничего не рендерит
};

export default GetProductsFromFirebase;
