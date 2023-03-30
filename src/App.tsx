import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { Container } from 'react-bootstrap'
 import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container className='align-items-center d-flex justify-content-center' style={{minHeight : '100vh'}}>
      <div className="w-100" style={{maxWidth : '400px'}}> 
        <Login/>
      </div>
      
    </Container>
  )
}

export default App
