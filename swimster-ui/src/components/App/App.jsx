import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Navbar from '../Navbar/Navbar'
import apiClient from '../../services/apiClient'
import { useAuthContext } from '../../contexts/auth'
import { style } from './style'

const App = () => {
  const [listings, setListings] = useState([])
  const { user, setUser } = useAuthContext()
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (error) setError(error)
    }

    const token = localStorage.getItem("swimster_session_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [setUser])

  useEffect(() =>{
    const fetchListings = async () => {
      setIsFetching(true)

      const { data, error } = await apiClient.fetchListings()
      if (error) setError(error)
      if (data) setListings(data.listings)

      setIsFetching(false)
    }

    fetchListings()
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
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
