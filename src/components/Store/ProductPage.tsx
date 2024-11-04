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

  interface CartProduct {
    id: string;
    itemBrand: string;
    itemCategoty: string;
    itemDescription: string;
    itemImg: string;
    itemName: string;
    itemPrice: number;
    itemQuantity: number;
  }

  const cartProducts: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]') as CartProduct[];

  const productAddToCartHandler = () => {
    const productExists = cartProducts.find(p => {
      return p.id === product.id;
    });
    console.log('productExists: ', productExists);

    if (!productExists) cartProducts.push(product);

    // const incrementedCartProducts = cartProducts.map(prod => {
    //   prod.itemQuantity++;

    //   // if (prod.id === product.id) {
    //   //   prod.itemQuantity++;
    //   // } else cartProducts.push(product);
    // });

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
