import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { routes } from './constants/routes';

/////////////// Work with Firebase products and store
/////////////// This piece of code to be placed elsewhere to avoid cluttering the App
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsFromFirebase } from './store/slices/getDbProductsSlice';
import { AppDispatch } from './store/store';
import { useSelector } from 'react-redux';
import { RootState } from './store/store'; // Путь к типам RootState

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const productsState = useSelector((state: RootState) => state.dbProducts);
  useEffect(() => {
    void dispatch(fetchProductsFromFirebase());
  }, [dispatch]);
  useEffect(() => {
    if (productsState.products.length > 0) {
      const productsFromStore = productsState.products;
      console.log('Products from store:', productsFromStore);
    }
  }, [productsState]);
  /////////////// End of work with Firebase products and store

  /////////////// Ignore React Router v7 Future Flag Warning
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
      return;
    }
    originalWarn(...args);
  };
  ///////////////

  return (
    <Router>
      <DefaultLayout>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </DefaultLayout>
    </Router>
  );
}

export default App;
