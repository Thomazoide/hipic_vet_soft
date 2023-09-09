import { Routes, Route } from 'react-router-dom';
import InterfazVet from './components/interfaz_vet'
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Routes>
      <Route path="/vet-user" element={ <InterfazVet/> }></Route>
    </Routes>
  );
}

export default App;
