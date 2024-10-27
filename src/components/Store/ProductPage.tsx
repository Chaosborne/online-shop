import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  itemCategoty: string;
  itemImg: string;
  itemBrand: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
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

  return (
    <div>
      <h1>{product.itemName}</h1>
      <p>{product.itemDescription}</p>
      <p>Цена: ${product.itemPrice}</p>
      <img src={product.itemImg} alt={product.itemName} />
    </div>
  );
};

export default ProductPage;
