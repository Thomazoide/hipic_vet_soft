import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import Interfaz_vet from './components/interfaz_vet'
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Interfaz_vet/> }></Route>
    </Routes>
  );
}

export default App;
