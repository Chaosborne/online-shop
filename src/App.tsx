import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { routes } from './constants/routes';

/////////////// Read Firebase and write to store // This piece of code to be placed elsewhere to avoid cluttering the App
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsFromFirebase } from './store/slices/getDbProductsSlice';
import { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    void dispatch(fetchProductsFromFirebase());
  }, [dispatch]);
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
