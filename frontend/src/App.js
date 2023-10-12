import { Routes, Route } from 'react-router-dom';
import InterfazVet from './components/interfaz_vet'
import InterfazLogin from './components/interfaz_login';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <InterfazLogin/> }/>
      <Route path="/vet-user" element={ <InterfazVet/> }/>
    </Routes>
  );
}

export default App;
