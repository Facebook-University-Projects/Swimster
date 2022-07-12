import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Navbar from '../Navbar/Navbar'

const style = {
  app: 'm-0 p-0 flex flex-col h-screen'
}

const App = () => {
  return (
    <BrowserRouter>
      <main className={style.app}>
        <Navbar />
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
