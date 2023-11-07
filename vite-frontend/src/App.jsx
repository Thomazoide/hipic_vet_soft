import { Routes, Route } from "react-router"
import InterfazLogin from "./pages/interfazLogin"
import InterfazAdmin from "./pages/interfazAdmin"
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<InterfazLogin/>} />
      <Route path='/admin-user' element={<InterfazAdmin/>} />
    </Routes>
  )
}

export default App
