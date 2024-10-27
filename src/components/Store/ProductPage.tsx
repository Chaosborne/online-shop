import React from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  itemCategoty: string; // возможно, опечатка, стоит использовать 'itemCategory'
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
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.itemName}</h1>
      <p>{product.itemDescription}</p>
      <p>Price: ${product.itemPrice}</p>
      <img src={product.itemImg} alt={product.itemName} />
    </div>
  );
};

export default ProductPage;
