// import './App.scss';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { DefaultLayout } from './components/layouts';
// import { routes } from './constants/routes';

// function App() {
//   /////////////// Ignore React Router v7 Future Flag Warning
//   const originalWarn = console.warn;
//   console.warn = (...args) => {
//     if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
//       return;
//     }
//     originalWarn(...args);
//   };
//   ///////////////

//   return (
//     <Router>
//       <DefaultLayout>
//         <Routes>
//           {routes.map(({ path, element }, index) => (
//             <Route key={index} path={path} element={element} />
//           ))}
//         </Routes>
//       </DefaultLayout>
//     </Router>
//   );
// }

// export default App;

import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { routes } from './constants/routes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsFromFirebase } from './store/slices/getDbProductsSlice';
import { AppDispatch } from './store/store';
import { useSelector } from 'react-redux';
import { RootState } from './store/store'; // Путь к типам RootState

function App() {
  /////////////// Work with Firebase products and store
  /////////////// This piece of code to be placed elsewhere to avoid cluttering the App
  const dispatch = useDispatch<AppDispatch>();
  const productsState = useSelector((state: RootState) => state.dbProducts);
  useEffect(() => {
    void dispatch(fetchProductsFromFirebase());
  }, [dispatch]);
  useEffect(() => {
    if (productsState.products.length > 0) {
      console.log('Products state from store:', productsState);
    }
  }, [productsState]);
  ///////////////

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
