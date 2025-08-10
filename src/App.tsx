import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { routes } from './constants/routes';
import { useFetchCategories } from './hooks/usefetchCategories';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useFetchFavorites } from './hooks/useFetchFavorites';
import { useAuth } from './hooks/useAuth';
import Loader from './components/ui/Loader/Loader';
import { useAppReady } from './hooks/useAppReady';

function App() {
  useAuth(); // Инициализация авторизации
  useFetchCategories();
  useFetchProducts();
  useFetchFavorites();

  // Check if all the fetches are done
  const isAppReady = useAppReady();

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
    <Router basename="/shop">
      <DefaultLayout>
        {!isAppReady ? (
          <Loader />
        ) : (
          <Routes>
            {routes.map(({ path, element }, index) => {
              return <Route key={index} path={path} element={element} />;
            })}
          </Routes>
        )}
      </DefaultLayout>
    </Router>
  );
}

export default App;
