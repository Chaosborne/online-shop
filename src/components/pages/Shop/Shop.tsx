import Categories from './Categories/Categories';
import Products from './Products/Products';
import GetProductsFromFirebase from '../../../api/GetProductsFromFirebase';

const Shop = () => {
  GetProductsFromFirebase();

  return (
    <main>
      <Categories />
      <Products />
    </main>
  );
};

export default Shop;
