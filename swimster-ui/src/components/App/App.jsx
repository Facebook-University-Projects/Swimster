import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { style } from './style'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Navbar from '../Navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className={style.app}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
