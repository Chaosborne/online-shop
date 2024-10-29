import './scss/App.scss';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import ProductPage from './components/Store/ProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ---- to be moved to backend ----
const PRODUCTS = [
  {
    id: 'item1',
    itemCategoty: 'someCategory',
    itemImg: 'img',
    itemBrand: 'Apple',
    itemName: 'iPhone 16',
    itemDescription: 'Описание',
    itemPrice: 100,
  },
  {
    id: 'item2',
    itemCategoty: 'someCategory',
    itemImg: 'img 2',
    itemBrand: 'Hewlett Packard',
    itemName: 'LJ 1020',
    itemDescription: 'Описание 2',
    itemPrice: 200,
  },
  {
    id: 'item3',
    itemCategoty: 'someCategory',
    itemImg: 'img 3',
    itemBrand: 'Samsung',
    itemName: 'Galaxy M',
    itemDescription: 'Описание 3',
    itemPrice: 300,
  },
  {
    id: 'item4',
    itemCategoty: 'someCategory',
    itemImg: 'img 4',
    itemBrand: 'Realme',
    itemName: 'GT 6',
    itemDescription: 'Описание 4',
    itemPrice: 400,
  },
];
// ---- end of to be moved to backend ----

function App() {
  return (
    <Router>
      <Header products={PRODUCTS} />
      <Routes>
        <Route path="/" element={<Main products={PRODUCTS} />} />
        <Route path="/product/:productSlug" element={<ProductPage products={PRODUCTS} />} />
      </Routes>
    </Router>
  );
}

export default App;
