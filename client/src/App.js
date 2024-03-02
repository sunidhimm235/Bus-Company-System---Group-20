import React from 'react'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Info from './Components/Info/Info'
import Navbar from './Components/NavBar/Navbar'
import Search from './Components/Search/Search'
import Subcribe from './Components/Subscribe/Subcribe'
import './index.css'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Search/>
      <Info/>
      <Subcribe/>
      <Footer/>
    </div>
  )
}

export default App