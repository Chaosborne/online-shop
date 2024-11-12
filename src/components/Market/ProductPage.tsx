import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/slices/cartSlice';
import { AppDispatch } from '../../store/store';
import styles from './ProductPage.module.scss';

interface Product {
  id: string;
  itemCategory: string;
  itemImg: string;
  itemBrand: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemQuantity: number;
  totalPrice: number;
}

interface ProductPageProps {
  products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  // Get dispatcher and cart data from redux
  const dispatch = useDispatch<AppDispatch>();

  // Check if product exists
  const { productSlug } = useParams<{ productSlug: string }>();

  const product = products.find(product => {
    const brandSlug = product.itemBrand.toLowerCase().replace(/\s+/g, '-');
    const nameSlug = product.itemName.toLowerCase().replace(/\s+/g, '-');
    const combinedSlug = `${brandSlug}-${nameSlug}`;

    return combinedSlug === productSlug;
  });

  if (!product) {
    return <p>Товар не найден</p>;
  }

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };
  const removeFromCartHandler = () => {
    dispatch(removeItemFromCart(product.id));
  };

  return (
    <main className={`${styles[`product-card`]}`}>
      <div className="container">
        <h1 className={styles['product__header']}>{product.itemBrand + ' ' + product.itemName}</h1>
        <img src={product.itemImg} alt={product.itemName} />
        <p>{product.itemDescription}</p>
        <p>Цена: ${product.itemPrice}</p>
        <button onClick={addToCartHandler}>Добавить в корзину</button>
        <button onClick={removeFromCartHandler}>Удалить из корзины</button>
        <h2>В корзине:</h2>
      </div>
    </main>
  );
};

export default ProductPage;
