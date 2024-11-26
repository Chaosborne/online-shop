import './App.scss';
import HomePage from './components/Homepage/HomePage';
import Header from './components/layout/Header';
import ShopPage from './components/Shop/ShopPage';
import ProductPage from './components/Shop/ProductPage';
import UserProfile from './components/UserProfile/UserProfile';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Favourites from './components/Shop/Favourites';

// ---- to be moved to backend ----
const PRODUCTS = [
  {
    id: 'item1',
    itemCategory: 'someCategory',
    itemImg: 'img',
    itemBrand: 'Apple',
    itemName: 'iPhone 16',
    itemDescription: 'Описание',
    itemPrice: 100,
    itemQuantity: 1,
    itemTotalPrice: 0,
  },
  {
    id: 'item2',
    itemCategory: 'someCategory',
    itemImg: 'img 2',
    itemBrand: 'Hewlett Packard',
    itemName: 'LJ 1020',
    itemDescription: 'Описание 2',
    itemPrice: 200,
    itemQuantity: 1,
    itemTotalPrice: 0,
  },
  {
    id: 'item3',
    itemCategory: 'someCategory',
    itemImg: 'img 3',
    itemBrand: 'Samsung',
    itemName: 'Galaxy M',
    itemDescription: 'Описание 3',
    itemPrice: 300,
    itemQuantity: 1,
    itemTotalPrice: 0,
  },
  {
    id: 'item4',
    itemCategory: 'someCategory',
    itemImg: 'img 4',
    itemBrand: 'Realme',
    itemName: 'GT 6',
    itemDescription: 'Описание 4',
    itemPrice: 400,
    itemQuantity: 1,
    itemTotalPrice: 0,
  },
];
// ---- end of to be moved to backend ----

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname != '/';

  return (
    <>
      {showHeader && <Header products={PRODUCTS} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage products={PRODUCTS} />} />
        <Route path="shop/product/:productSlug" element={<ProductPage products={PRODUCTS} />} />
        <Route path="shop/my/UserProfile" element={<UserProfile />} />
        <Route path="shop/my/Favourites" element={<Favourites />} />
        <Route path="shop/my/Cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
