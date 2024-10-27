import './scss/App.scss';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

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
    itemBrand: 'Apple',
    itemName: 'iPad Air',
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
    <>
      <Header products={PRODUCTS} />
      <Main products={PRODUCTS} />
    </>
  );
}

export default App;
