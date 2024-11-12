import './scss/App.scss';
import Header from './components/layout/Header';
import MainPage from './components/layout/MainPage';
import ProductPage from './components/Market/ProductPage';
import UserProfile from './components/UserAccount/UserProfile';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Header products={PRODUCTS} />
      <Routes>
        <Route path="/" element={<MainPage products={PRODUCTS} />} />
        <Route path="/product/:productSlug" element={<ProductPage products={PRODUCTS} />} />
        <Route path="/my/UserProfile" element={<UserProfile />} />
        <Route path="/my/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
