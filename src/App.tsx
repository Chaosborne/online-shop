import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { routes } from './constants/routes';

function App() {
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
