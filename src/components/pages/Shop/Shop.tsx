import Categories from './Categories/Categories';
import Products from './Products/Products';
import WorkWithFirebase from '../../../api/WorkWithFirebase';

const Shop = () => {
  WorkWithFirebase();

  return (
    <main>
      <Categories />
      <Products />
    </main>
  );
};

export default Shop;
