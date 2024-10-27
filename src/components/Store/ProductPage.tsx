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

  const [itemBrand, ...itemNameParts] = productSlug.split('-');
  const itemName = itemNameParts.join(' ');

  const product = products.find(p => p.itemBrand.toLowerCase() === itemBrand.toLowerCase() && p.itemName.toLowerCase() === itemName.toLowerCase());

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
