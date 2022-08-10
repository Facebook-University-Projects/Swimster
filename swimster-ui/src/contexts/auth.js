import { useState, createContext, useContext } from 'react'
import apiClient from '../services/apiClient'
import { useNotification } from '../hooks/useNotification'

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [initialized, setInitialized] = useState(false)
    const [user, setUser] = useState({})
    const { setSuccess, setError } = useNotification()

    // auth functions from apiClient w/ validation and security checks
    const handlers = {
        loginUser: async credentials => {
            const { data, error } = await apiClient.loginUser(credentials)
            if (error) setError(error)
            if (data?.user) {
                setUser(data.user)
                apiClient.setToken(data.token)
                localStorage.setItem("swimster_session_token", data.token)
                setSuccess("Logged in!")
            }
        },
        registerUser: async credentials => {
            const { data, error } = await apiClient.registerUser(credentials)
            if (error) setError(error)
            if (data?.user) {
                setUser(data.user)
                apiClient.setToken(data.token)
                localStorage.setItem("swimster_session_token", data.token)
            }
        },
        logoutUser: () => {
            apiClient.logoutUser()
            setUser({})
            setInitialized(false)
        },
        fetchUserFromToken: async () => {
            const { data, error } = await apiClient.fetchUserFromToken()
            if (error) setError(error)
            if (data?.user?.email) setUser(data.user)
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

export const isUserAuthenticated = (user, initialized) => Boolean(initialized && user?.email)
