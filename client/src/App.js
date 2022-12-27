import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> }/>
      <Route path="/home" element={ <Home /> }/>
      <Route path="*" element={ <NotFound /> }/>
    </Routes>
  );
};

export default App;
