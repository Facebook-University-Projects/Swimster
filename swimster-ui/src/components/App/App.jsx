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
  const { handlers: authHandlers, isUserAuthenticated, setInitialized } = useAuthContext()
  const { handlers: listingsHandlers } = useListingsContext()

  useEffect(() => {
    const initApp = async () => {
      console.log("Initializing App...")
      const token = localStorage.getItem("swimster_session_token")

      if (token) {
        apiClient.setToken(token)
        await authHandlers.fetchUserFromToken()
        await listingsHandlers.fetchListings()
      }

      setInitialized(true)
    }

    initApp()
    console.log("App is ready to go!")
  }, [setInitialized, isUserAuthenticated])

  return (
    <BrowserRouter>
      <main className={style.app}>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute element={<Home />} />
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
