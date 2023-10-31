import { Routes, Route } from 'react-router-dom';
import InterfazVet from './components/interfaz_vet'
import InterfazLogin from './components/interfaz_login';
import InterfazAdmin from './components/interfaz_admin';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useAuthContext } from './hooks/useLoginContext';
import TestingComp from './components/testing_component';


function App() {
  const {user} = useAuthContext()
  return (
    <Routes>
      <Route path='/' element={ <InterfazLogin/> }/>
      <Route path="/vet-user" element={<InterfazVet/> }/>
      <Route path="/admin" element={ <InterfazAdmin/> }/>
      <Route path='/testing-route' element={ <TestingComp/> }/>
    </Routes>
  );
}

export default App;
