import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Navbar from '../Navbar/Navbar'
import apiClient from '../../services/apiClient'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import CreatePool from '../CreatePool/CreatePool'
import ListingDetail from '../ListingDetail/ListingDetail'
import { useAuthContext } from '../../contexts/auth'
import { useListingsContext } from '../../contexts/listings'
import { style } from './style'

const App = () => {
  const { user, setUser, isUserAuthenticated } = useAuthContext()
  const { handlers: listingsHandlers } = useListingsContext()
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

  useEffect(() => {
    const fetchListings = async () => {
      await listingsHandlers.fetchListings()
    }

    fetchListings()
  }, [isUserAuthenticated])

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
          <Route path='/' element={
            <ProtectedRoute element={
              <Home />
            }
            />
          }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/createpool' element={<CreatePool />} />
          <Route path='/listings/:listingId' element={<ListingDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
