// import styles from './ShopPage.module.scss';
import Categories from '../Categories/Categories';
import ProductsSection from './ProductsSection';

const ShopPage = ({ products }: { products: { id: string; itemCategory: string; itemImg: string; itemBrand: string; itemName: string; itemDescription: string; itemPrice: number; itemTotalPrice: number }[] }) => {
  return (
    <main className="main">
      <Categories />
      <ProductsSection products={products} />
    </main>
  );
};

export default ShopPage;
