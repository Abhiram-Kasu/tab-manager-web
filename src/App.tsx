import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { Container } from 'react-bootstrap'
 import "react-toastify/dist/ReactToastify.css";
 import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp'
import { MainPage } from './components/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      
        
      </BrowserRouter>
    
  )
}

export default App
