import { useState, createContext, useContext } from 'react'
import apiClient from '../services/apiClient'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [initialized, setInitialized] = useState(false)
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)

    // auth functions from apiClient w/ validation and security checks
    const handlers = {
        loginUser: async credentials => {
            const { data, error } = await apiClient.loginUser(credentials)
            if (data?.user) {
                setUser(data.user)
                apiClient.setToken(data.token)
                localStorage.setItem("swimster_session_token", data.token)
            } if (error) setError(error)
        },
        registerUser: async credentials => {
            const { data, error } = await apiClient.registerUser(credentials)
            if (data?.user) {
                setUser(data.user)
                apiClient.setToken(data.token)
                localStorage.setItem("swimster_session_token", data.token)
            } if (error) setError(error)
        },
        logoutUser: () => {
            apiClient.logoutUser()
            setUser({})
            setInitialized(true)
            setError(null)
        },
        fetchUserFromToken: async () => {
            const { data } = await apiClient.fetchUserFromToken()
            if (data?.user?.email) setUser(data.user)
            if (error) setError(error)
            setInitialized(true)
        }
    }

    const authValue = {
        user,
        setUser,
        handlers,
        initialized,
        setInitialized,
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export const isUserAuthenticated = user => Boolean(user?.email)
