import { Routes, Route } from "react-router"
import InterfazLogin from "./pages/interfazLogin"
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<InterfazLogin/>} />
    </Routes>
  )
}

export default App
