import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <div className='min-h-[81.2vh] bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>
      <Manager/>
   
     </div>
    <Footer/>
 
    </>
  )
}

export default App
