import React from 'react';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  itemCategoty: string;
  itemImg: string;
  itemBrand: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemQuantity: number;
}

interface ProductPageProps {
  products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
  const { productSlug } = useParams<{ productSlug: string }>();

  if (!productSlug) {
    return <p>Товар не найден</p>;
  }

  const product = products.find(product => {
    const brandSlug = product.itemBrand.toLowerCase().replace(/\s+/g, '-');
    const nameSlug = product.itemName.toLowerCase().replace(/\s+/g, '-');
    const combinedSlug = `${brandSlug}-${nameSlug}`;

    return combinedSlug === productSlug;
  });

  if (!product) {
    return <p>Товар не найден</p>;
  }

  const productAddToCartHandler = () => {
    const cartProducts: Product[] = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];

    const existingProductIndex = cartProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      cartProducts[existingProductIndex].itemQuantity += 1;
    } else {
      cartProducts.push({ ...product, itemQuantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartProducts));
  };

  return (
    <main className={`main ${styles[`product-card`]}`}>
      <div className="container">
        <h1 className={styles['product__header']}>{product.itemBrand + ' ' + product.itemName}</h1>
        <img src={product.itemImg} alt={product.itemName} />
        <p>{product.itemDescription}</p>
        <p>Цена: ${product.itemPrice}</p>
        <button onClick={productAddToCartHandler}>Добавить в корзину</button>
      </div>
    </main>
  );
};

export default ProductPage;
