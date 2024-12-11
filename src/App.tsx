import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './components/layouts';
import { routes } from './constants/routes';
import ApiTestButton from './api/ApiTestButton';

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
      <div className="container">
        <ApiTestButton />
      </div>
    </Router>
  );
}

export default App;
