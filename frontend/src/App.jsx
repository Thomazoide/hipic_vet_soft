import { Routes, Route } from "react-router"
import InterfazLogin from "./pages/interfazLogin"
import InterfazAdmin from "./pages/interfazAdmin"
import InterfazPrep from "./pages/interfazPrep"
import InterfazVet from "./pages/interfazVet"
import TestPage from "./pages/testPage"
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<InterfazLogin/>} />
      <Route path='/admin-user' element={<InterfazAdmin/>} />
      <Route path='/prep-user' element={<InterfazPrep/>} />
      <Route path='/vet-user' element={<InterfazVet/>} />
      <Route path='/dev' element={<TestPage/>} />
    </Routes>
  )
}

export default App
