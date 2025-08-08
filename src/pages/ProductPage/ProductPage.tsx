import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/slices/cartSlice';
import { AppDispatch, RootState } from '../../store/store';
import { getItemQuantity } from '../../store/slices/cartSlice';
import generateProductSlug from '../../helpers/generateProductSlug';
import { CartIcon } from '../../assets/img/CartIcon';
import { BinIcon } from '../../assets/img/BinIcon';

import s from './ProductPage.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
// import { productsMockData } from '../../../constants/mocks/products'; // Пока оставляю, источник может быть не окончательный

const Product = () => {
  const [mainImage, setMainImage] = useState(0);
  
  // Get products from store (previously got from Firestore)
  const productsState = useSelector((state: RootState) => state.dbProducts);
  const productsFromStore = productsState.products || [];

  const dispatch = useDispatch<AppDispatch>();

  // Check if product exists
  const { productSlug } = useParams<{ productSlug: string }>();

  // const product = productsMockData.find(product => {
  const product = productsFromStore.find(product => {
    const productSlugFromData = generateProductSlug(product.itemBrand, product.itemName);
    return productSlugFromData === productSlug;
  });

  // Get actual item quantity from Cart
  const itemId = product?.id;
  const itemQuantityInCart = useSelector((state: RootState) => {
    if (itemId) {
      return getItemQuantity(state.cart, itemId);
    }
    return 0;
  });
  //

  if (!product) {
    return <p>Товар не найден</p>;
  }

  const addToCartHandler = () => dispatch(addItemToCart(product));
  const removeFromCartHandler = () => dispatch(removeItemFromCart(product.id));

  return (
    <main className={s.Card}>
      <div className="container">
        <h1 className={clsx(s.Title, s.ProductPageTitle)}>{clsx(product.itemBrand, product.itemName)}</h1>
        <div className={s.ProductInfo}>
          <div className={s.GalleryNav}>
            {product.images.map((image, index) => (
              <img 
                className={clsx(s.GalleryNavImg, index === mainImage && s.SelectedImage)} 
                key={index} 
                src={`/shop/productsImages/${image}`} 
                alt={product.itemName} 
                onClick={() => setMainImage(index)} 
              />
            ))}
          </div>
          <img className={s.GalleryMainImg} src={`/shop/productsImages/${product.images[mainImage]}`} alt={product.itemName} />
          <div className={s.ProductDetails}>
            <h2 className={s.Description}>{product.itemDescription}</h2>
            <h3 className={s.Title}>{product.itemBrand} {product.itemName}</h3>
            <p className={s.Price}>Цена: {product.itemPrice.toLocaleString('ru-RU')} ₽</p>
            <button className={s.AddToCartBtn} onClick={addToCartHandler}>
              <CartIcon className={s.AddToCartBtnIcon} />
            </button>
            <button className={s.removeItemFromCartBtn} onClick={removeFromCartHandler}>
              <BinIcon />
            </button>
            <h2>В корзине: {itemQuantityInCart}</h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
