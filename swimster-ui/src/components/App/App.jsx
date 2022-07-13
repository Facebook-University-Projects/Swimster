import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Navbar from '../Navbar/Navbar'
import apiClient from '../../services/apiClient'

const style = {
  app: 'm-0 p-0 flex flex-col h-screen'
}

const App = () => {
  const [listings, setListings] = useState([])
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)


  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (error) setError(error)
    }

    const token = localStorage.getItem("swimster_session_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  const handleLogout = async () => {
    await apiClient.logoutUser()
    setUser({})
    setError(null)
  }

  return (
    <BrowserRouter>
      <main className={style.app}>
        <Navbar user={user} handleLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={<Home listings={listings}/>}/>
          <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
          <Route path='/register' element={<Register user={user} setUser={setUser}/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
