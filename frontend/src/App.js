import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InterfazVet from './components/interfaz_vet'
import InterfazLogin from './components/interfaz_login';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useAuthContext } from './hooks/useLoginContext';
import jwt_decode from 'jwt-decode'


function App() {
  const {user} = useAuthContext()
  if(user) console.log(jwt_decode(user.token))
  return (
    <Routes>
      <Route path='/' element={ <InterfazLogin/> }/>
      <Route path="/vet-user" element={user ? <InterfazVet/> : <InterfazLogin/> }/>
    </Routes>
  );
}

export default App;
